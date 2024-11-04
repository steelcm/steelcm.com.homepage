---
title: How to format dates with ordinal number suffixes in Liquid
excerpt:
  Struggling to make dates sound natural in Liquid templates? Learn how to add
  ordinal suffixes ('st,' 'nd,' 'rd,' 'th') for a conversational touch.
---

Using ordinal suffixes for dates (like "1st," "2nd," "3rd," and "4th") makes the
date sound more natural and conversational, especially in spoken or informal
writing. However, in [Liquid](https://shopify.github.io/liquid/), the templating
language often used with platforms like [Shopify](https://www.shopify.com/) and
[11ty](https://www.11ty.dev/), there is no way to append this suffix without
custom code.

### Custom Date Formats

For example, displaying a date with a custom format uses
[strftime](https://strftime.net/) syntax.

{% raw %}

```liquid
{{ '2024-11-03' | date: '%Y-%m-%d' }}
<!-- Outputs "2024-11-03" -->

{{ 'now' | date: '%B %e, %Y' }}
<!-- Outputs "November 3, 2024" -->
```

{% endraw %}

However, Liquid does not natively support automatic ordinal suffixes in date
formatting. To add these, a common workaround is to use conditional logic within
Liquid to append the correct suffix based on the day of the month.

### Custom Date Formats

{% raw %}

```liquid
{% assign myDate = '2024-11-03' %}
```

{% endraw %}

First we need to assign a date to a variable `myDate` to play around with. In
reality this would be the date you want to find the ordinal suffix for.

{% raw %}

```liquid
{% assign d = myDate | date: '%e' | modulo: 10 %}
```

{% endraw %}

{% raw %}`{% assign d = ... %}`{% endraw %} is creating a new variable called d.

`myDate | date: "%e"` is taking the myDate variable and formatting it as a day
of the month without zero-padding (e.g., "3" instead of "03"). The `%e` format
outputs the day of the month as a number from 1 to 31.

`... | modulo: 10` takes the result of `myDate | date: "%e"` and finds the
remainder when divided by 10.

{% raw %}

```liquid
{% assign nth = 'th' %}
{% case d %}
  {% when 1 %}
    {% assign nth = 'st' %}
  {% when 2 %}
    {% assign nth = 'nd' %}
  {% when 3 %}
    {% assign nth = 'rd' %}
{% endcase %}
```

{% endraw %}

Next we set the default suffix `nth` as `th`. We then use a case statement to
return different suffixes.

When we put this all together it looks as follows:

{% raw %}

```liquid
{% liquid
  assign myDate = '2024-11-03'
  assign d = myDate | date: '%e' | modulo: 10
  # TODO: add logic for 11th, 12th, 13th
  assign nth = 'th'
  case d
    when 1
      assign nth = 'st'
    when 2
      assign nth = 'nd'
    when 3
      assign nth = 'rd'
  endcase
%}
{{ myDate | date: '%B %e' -}}
{{- nth }}
<!-- Outputs "November 3rd" -->
```

{% endraw %}
