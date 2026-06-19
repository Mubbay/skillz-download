<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" 
  xmlns:html="http://www.w3.org/TR/REC-html40"
  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
  xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
        <title>XML Sitemap</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <style type="text/css">
          :root {
            --primary: #7c3aed;
            --primary-dark: #5b21b6;
            --bg: #f8f9fc;
            --text: #334155;
            --gray: #94a3b8;
            --border: #e2e8f0;
          }
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
            color: var(--text);
            background-color: var(--bg);
            margin: 0;
            padding: 0;
            line-height: 1.6;
          }
          .header {
            background: linear-gradient(135deg, var(--primary), var(--primary-dark));
            color: white;
            padding: 40px 20px;
            text-align: center;
          }
          .header h1 {
            margin: 0 0 10px 0;
            font-size: 2.5rem;
            font-weight: 800;
          }
          .header p {
            margin: 0;
            opacity: 0.9;
            font-size: 1.1rem;
          }
          .container {
            max-width: 1000px;
            margin: 40px auto;
            padding: 0 20px;
          }
          .card {
            background: white;
            border-radius: 12px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.05), 0 10px 15px rgba(0,0,0,0.02);
            padding: 30px;
            margin-bottom: 30px;
          }
          .info-box {
            background: #f0fdf4;
            border-left: 4px solid #22c55e;
            padding: 15px 20px;
            margin-bottom: 30px;
            border-radius: 4px;
            color: #166534;
            font-size: 0.95rem;
          }
          table {
            width: 100%;
            border-collapse: collapse;
          }
          th {
            text-align: left;
            padding: 15px 12px;
            border-bottom: 2px solid var(--border);
            color: var(--gray);
            font-weight: 600;
            font-size: 0.85rem;
            text-transform: uppercase;
            letter-spacing: 0.05em;
          }
          td {
            padding: 15px 12px;
            border-bottom: 1px solid var(--border);
            font-size: 0.95rem;
          }
          tr:hover td {
            background-color: #f8fafc;
          }
          a {
            color: var(--primary);
            text-decoration: none;
            font-weight: 500;
          }
          a:hover {
            text-decoration: underline;
          }
          .badge {
            background: #f1f5f9;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 0.8rem;
            color: var(--gray);
            font-family: monospace;
          }
          .footer {
            text-align: center;
            padding: 20px;
            color: var(--gray);
            font-size: 0.9rem;
            margin-top: 40px;
            border-top: 1px solid var(--border);
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Skillz Download Sitemap</h1>
          <p>Structured XML Sitemap for Search Engines</p>
        </div>
        
        <div class="container">
          <div class="info-box">
            This is an XML Sitemap, meant for consumption by search engines like Google or Bing. 
            <br/>You can find more information about XML sitemaps on <a href="http://sitemaps.org" target="_blank" style="color: #15803d; text-decoration: underline;">sitemaps.org</a>.
          </div>
          
          <div class="card">
            <xsl:if test="count(sitemap:sitemapindex/sitemap:sitemap) &gt; 0">
              <h2 style="margin-top:0; font-size: 1.5rem;">Sitemap Index</h2>
              <p style="color: var(--gray); margin-bottom: 20px;">This index contains <xsl:value-of select="count(sitemap:sitemapindex/sitemap:sitemap)"/> sitemaps.</p>
              <table>
                <thead>
                  <tr>
                    <th>Sitemap URL</th>
                    <th width="20%">Last Modified</th>
                  </tr>
                </thead>
                <tbody>
                  <xsl:for-each select="sitemap:sitemapindex/sitemap:sitemap">
                    <tr>
                      <td>
                        <a href="{sitemap:loc}"><xsl:value-of select="sitemap:loc"/></a>
                      </td>
                      <td>
                        <xsl:value-of select="concat(substring(sitemap:lastmod,0,11),concat(' ', substring(sitemap:lastmod,12,5)),concat(' ', substring(sitemap:lastmod,20,6)))"/>
                      </td>
                    </tr>
                  </xsl:for-each>
                </tbody>
              </table>
            </xsl:if>
            
            <xsl:if test="count(sitemap:sitemapindex/sitemap:sitemap) = 0">
              <h2 style="margin-top:0; font-size: 1.5rem;">Sitemap URLs</h2>
              <p style="color: var(--gray); margin-bottom: 20px;">This sitemap contains <xsl:value-of select="count(sitemap:urlset/sitemap:url)"/> URLs.</p>
              <table>
                <thead>
                  <tr>
                    <th>URL</th>
                    <th width="15%">Priority</th>
                    <th width="15%">Change Freq</th>
                    <th width="20%">Last Modified</th>
                  </tr>
                </thead>
                <tbody>
                  <xsl:for-each select="sitemap:urlset/sitemap:url">
                    <tr>
                      <td>
                        <a href="{sitemap:loc}"><xsl:value-of select="sitemap:loc"/></a>
                      </td>
                      <td>
                        <span class="badge"><xsl:value-of select="sitemap:priority"/></span>
                      </td>
                      <td>
                        <span style="text-transform: capitalize;"><xsl:value-of select="sitemap:changefreq"/></span>
                      </td>
                      <td>
                        <xsl:value-of select="concat(substring(sitemap:lastmod,0,11),concat(' ', substring(sitemap:lastmod,12,5)),concat(' ', substring(sitemap:lastmod,20,6)))"/>
                      </td>
                    </tr>
                  </xsl:for-each>
                </tbody>
              </table>
            </xsl:if>
          </div>
          
          <div class="footer">
            Generated by Skillz Download SEO Engine
          </div>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
