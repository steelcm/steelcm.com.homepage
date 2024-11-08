---
title: Disallow all the robots! Search Engine Optimisation using Robots.txt
date: 2024-11-01
excerpt: What’s the robot.txt? How do I create one? Is it even required?!
---

### What is the robots.txt

The `robots.txt` file sits in the root domain of your website (ie.
[https://steelcm.com/robots.txt](https://steelcm.com/robots.txt) and is intended
for the consumption of web crawlers and, well, robots. So not for your average
user. At it’s very core, it’s a set of guidelines about what should and should
not be indexed on your website.

![image](/images/code-is-more-of-a-guideline.webp)

### What is a web crawler?

Web crawlers, also known as web spiders or web robots, are programs that browse
the web in an automated manor collecting information usually for legitimate
reasons. For example, search engines (such as Google) will use crawlers to
ensure that they have up-to-date information about your site for their search
indexes. Crawlers will load a web page, and read it’s contents. It will then
follow any links on that page and repeat the process until every page in your
website has been visited… I for one welcome our new robotic overlords.

![image](/images/robot-overlords.webp)

### Why does the robots.txt exist!

The Robots.txt standard was first proposed in 1994 by
[Martijn Koster](https://en.wikipedia.org/wiki/Martijn_Koster) after a
misbehaving web crawler inadvertently caused a denial of service (DOS) attack on
Koster’s server. Not wanting the incident to reoccur, Koster proposed the
standard on the www-talk mailing list, the main communication channel for web
related activities at the time.

### How do I create a robots.txt?

The robots.txt file is a simple text file that resides in the root of your
website. You can create a static text file manually named robots.txt and place
it on your server. Most web servers will treat files with the \*.txt extensions
as a static file and serve it without any further configuration.

An example of a robots.txt file could look like the following:

```
User-agent: msnbot
Crawl-delay: 120
Disallow: /admin/
Noindex: /admin/
Disallow: /*.xml$

User-agent discobot
Disallow: /

User-agent: *
Allow: /

Sitemap: https://www.steelcm.com/sitemap.xml
```

### What does user-agents do?

When a user or a crawler makes a web request they usually also include
`user-agent` request header. This is optional, but provides information about
who or what is making the request. For example, if you are using firefox, you
will be sending a `user-agent` with each request that looks a little like the
following:

`Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:52.0) Gecko/20100101 Firefox/52.0`

Web crawlers can also send a `user-agent` to clearly identify themselves. We can
specify the `user-agent` in our robots.txt file to apply rules only to that one
web crawler. [robotstxt.org](https://www.robotstxt.org/db.html) contains a list
of many web crawler user-agents for reference.

In our example we are explicitly denoting rules for the MSN web crawler
(`User-agent: msnbot`). This will only apply the following elements
(`crawl-delay` & `disallow`) to the web crawler. You can also use a wild card
User-agent: \* which will apply the following elements (`allow`) to anything
that doesn’t match another section.

### What does allow/disallow do?

Allow and disallow elements, as you might expect, tells the web crawler which
directories or paths it can or cannot access respectively. In our example we can
see that the msn bot is not allowed to crawl anything under the `admin`
directory, and on the next line, any file path ending in `.xml`.

In our example the discobot is being told not to crawl anything on the website
whatsoever, and the final segment is saying, any other agent, crawl everything!

### What does noindex do?

Disallow tells the crawler to not visit a path or directory, but these elements
may still appear in search results because other crawlable pages are linking to
them. To prevent these pages or directories appearing in search results it’s
best to add the `Noindex` option, which tells crawlers, such as Google, not to
show them in search results.

### What does Sitemap do?

The sitemap field simply directs the crawler to your websites sitemap if you
have one. Historically, you would need to submit sitemaps directly to search
engines, this provides a simpler mechanism to do so. It should be noted that,
according to
[sitemaps.org](https://www.sitemaps.org/protocol.html#submit_robots)
specification, a full URL needs to used, rather than a relative one.

### What does crawl-delay do?

The crawl-delay element is a way of throttling requests for the given crawler.
The number specified against this element represents the number of seconds
between each crawl request. So in our example the MSN crawler has the following:

`Crawl-delay: 120`

Which means, only request a new page every 120 seconds (ie. 2 minutes). This is
useful if your site is heavily crawled and it’s impeding normal organic traffic.

### Is a robots.txt required?

No. Search engines, such as Google, will crawl your site if a robots.txt is not
present (see
[Google’s FAQ](https://developers.google.com/search/docs/crawling-indexing/robots/intro#h01)).
However it is recommended if you want better control on how, what and when your
site is crawled. In addition, crawlers are notorious for requesting non-existent
pages as they try and find every page that exists on your website. If you find
that your logs are inundated by 404 messages generated by web crawlers making it
hard to identify legitimate errors, then robots.txt is the tool for you!

The biggest thing to remember is that the robots.txt is a guideline and not a
rule. Most search engine crawlers do adhere to the guideline, but anyone can
create a crawler that ignores the robots.txt file.
