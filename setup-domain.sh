#!/bin/bash

# Custom Domain Setup Script for disguisemyapp.com → GitHub Pages
# Based on GitHub Pages + Cloudflare DNS configuration

set -e  # Exit on any error

echo "🚀 Setting up custom domain: disguisemyapp.com → GitHub Pages"
echo ""

# ============================================================================
# 0) Variables - YOU NEED TO SET THESE
# ============================================================================

export GH_OWNER="kilik911"
export GH_REPO="disguisemyapp"           # Your GitHub repository name
export DOMAIN="disguisemyapp.com"
export WWW_HOST="www.disguisemyapp.com"
export GH_HOST_DEFAULT="kilik911.github.io"   # GitHub Pages default host

# ⚠️  IMPORTANT: Set these tokens before running
if [[ -z "$GITHUB_TOKEN" ]]; then
    echo "❌ ERROR: GITHUB_TOKEN environment variable not set"
    echo "   Please set: export GITHUB_TOKEN='your_github_personal_access_token'"
    echo "   Token needs 'repo' scope (or Pages:write for fine-grained tokens)"
    echo ""
    exit 1
fi

if [[ -z "$CF_API_TOKEN" ]]; then
    echo "❌ ERROR: CF_API_TOKEN environment variable not set"  
    echo "   Please set: export CF_API_TOKEN='your_cloudflare_api_token'"
    echo "   Token needs Zone:DNS Edit permissions for $DOMAIN"
    echo ""
    exit 1
fi

echo "✅ Environment variables configured"
echo "   Repository: $GH_OWNER/$GH_REPO"
echo "   Domain: $DOMAIN"
echo ""

# ============================================================================
# 1) Configure GitHub Pages with custom domain
# ============================================================================

echo "📋 Step 1: Configuring GitHub Pages..."

# Check current Pages settings
echo "   Checking current Pages configuration..."
CURRENT_CONFIG=$(gh api -H "X-GitHub-Api-Version: 2022-11-28" /repos/$GH_OWNER/$GH_REPO/pages 2>/dev/null || echo "null")

if [[ "$CURRENT_CONFIG" == "null" ]]; then
    echo "   Creating Pages site..."
    gh api -X POST -H "X-GitHub-Api-Version: 2022-11-28" \
      /repos/$GH_OWNER/$GH_REPO/pages \
      -f source[branch]=main -f source[path]=/
    echo "   ✅ Pages site created"
else
    echo "   ✅ Pages site already exists"
fi

# Set custom domain + enforce HTTPS
echo "   Setting custom domain and enabling HTTPS..."
gh api -X PUT -H "X-GitHub-Api-Version: 2022-11-28" \
  /repos/$GH_OWNER/$GH_REPO/pages \
  -f cname="$DOMAIN" \
  -f https_enforced=true \
  -f source[branch]=main -f source[path]=/

echo "   ✅ Custom domain configured: $DOMAIN"
echo ""

# ============================================================================
# 2) Set up Cloudflare DNS records
# ============================================================================

echo "🌐 Step 2: Setting up Cloudflare DNS..."

# Get Cloudflare Zone ID
echo "   Getting Cloudflare Zone ID for $DOMAIN..."
CF_ZONE_ID=$(curl -s -H "Authorization: Bearer $CF_API_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api.cloudflare.com/client/v4/zones?name=$DOMAIN" | jq -r '.result[0].id')

if [[ "$CF_ZONE_ID" == "null" || -z "$CF_ZONE_ID" ]]; then
    echo "❌ ERROR: Could not find Cloudflare zone for $DOMAIN"
    echo "   Please ensure the domain is added to your Cloudflare account"
    exit 1
fi

echo "   ✅ Zone ID: $CF_ZONE_ID"

# GitHub Pages IPv4 addresses (A records for apex domain)
echo "   Creating A records for apex domain..."
declare -a IPV4_ADDRESSES=("185.199.108.153" "185.199.109.153" "185.199.110.153" "185.199.111.153")

for ip in "${IPV4_ADDRESSES[@]}"; do
    echo "   Adding A record: @ → $ip"
    curl -s -X POST "https://api.cloudflare.com/client/v4/zones/$CF_ZONE_ID/dns_records" \
      -H "Authorization: Bearer $CF_API_TOKEN" \
      -H "Content-Type: application/json" \
      --data "{\"type\":\"A\",\"name\":\"@\",\"content\":\"$ip\",\"ttl\":1,\"proxied\":false}" \
      > /dev/null
done

# GitHub Pages IPv6 addresses (AAAA records for apex domain)
echo "   Creating AAAA records for apex domain..."
declare -a IPV6_ADDRESSES=("2606:50c0:8000::153" "2606:50c0:8001::153" "2606:50c0:8002::153" "2606:50c0:8003::153")

for ip6 in "${IPV6_ADDRESSES[@]}"; do
    echo "   Adding AAAA record: @ → $ip6"
    curl -s -X POST "https://api.cloudflare.com/client/v4/zones/$CF_ZONE_ID/dns_records" \
      -H "Authorization: Bearer $CF_API_TOKEN" \
      -H "Content-Type: application/json" \
      --data "{\"type\":\"AAAA\",\"name\":\"@\",\"content\":\"$ip6\",\"ttl\":1,\"proxied\":false}" \
      > /dev/null
done

# CNAME record for www subdomain
echo "   Creating CNAME record for www subdomain..."
echo "   Adding CNAME record: www → $GH_HOST_DEFAULT"
curl -s -X POST "https://api.cloudflare.com/client/v4/zones/$CF_ZONE_ID/dns_records" \
  -H "Authorization: Bearer $CF_API_TOKEN" \
  -H "Content-Type: application/json" \
  --data "{\"type\":\"CNAME\",\"name\":\"www\",\"content\":\"$GH_HOST_DEFAULT\",\"ttl\":1,\"proxied\":false}" \
  > /dev/null

echo "   ✅ DNS records created (DNS-only mode for initial setup)"
echo ""

# ============================================================================
# 3) Verify DNS configuration
# ============================================================================

echo "🔍 Step 3: Verifying DNS configuration..."

echo "   Checking A records for $DOMAIN:"
dig +noall +answer $DOMAIN A | head -4

echo "   Checking AAAA records for $DOMAIN:"  
dig +noall +answer $DOMAIN AAAA | head -4

echo "   Checking CNAME for $WWW_HOST:"
dig +noall +answer $WWW_HOST CNAME

echo ""

# ============================================================================
# 4) Final instructions
# ============================================================================

echo "🎉 Domain setup initiated!"
echo ""
echo "⏳ Next steps:"
echo "   1. DNS propagation: Wait 5-15 minutes for DNS to propagate globally"
echo "   2. HTTPS certificate: GitHub will automatically issue a Let's Encrypt certificate"
echo "      (This can take up to 24 hours, but usually much faster)"
echo "   3. Test your domains:"
echo "      • $DOMAIN"
echo "      • $WWW_HOST"
echo ""
echo "🔧 If HTTPS doesn't work after 1 hour:"
echo "   • Temporarily keep Cloudflare records in 'DNS-only' mode (gray cloud)"
echo "   • GitHub needs direct access to issue certificates"
echo "   • You can enable Cloudflare proxy (orange cloud) after HTTPS is working"
echo ""
echo "📋 Manual verification commands:"
echo "   curl -I https://$DOMAIN"
echo "   curl -I https://$WWW_HOST"
echo ""
echo "🔗 GitHub Pages settings: https://github.com/$GH_OWNER/$GH_REPO/settings/pages"
echo ""
