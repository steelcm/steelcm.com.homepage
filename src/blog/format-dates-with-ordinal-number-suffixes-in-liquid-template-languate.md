---
date: 2024-11-08
title: How to format dates with ordinal number suffixes in Liquid
excerpt:
  Struggling to make dates sound natural in Liquid templates? Learn how to add
  ordinal suffixes ('st,' 'nd,' 'rd,' 'th') for a conversational touch.
---

---

Using ordinal suffixes for dates (like "1st," "2nd," "3rd," and "4th") makes the
date sound more natural and conversational, especially in spoken or informal
writing. However, in [Liquid](https://shopify.github.io/liquid/), the templating
language often used with platforms like [Shopify](https://www.shopify.com/) and
[11ty](https://www.11ty.dev/), there is no way to append this suffix without
custom code.

The following calculates the correct ordinal suffix for the given date.

{% raw %}

```liquid
{% liquid
  # Set the initial date
  assign myDate = '2024-11-03'

  # Get the last digit of the day (1-31) for determining suffix
  assign d = myDate | date: '%e' | modulo: 10

  # Get the full day number (1-31)
  assign d2 = myDate | date: '%e'

  # Special case: 11th, 12th, 13th always use 'th'
  if d2 >= 11 and d2 <= 13
    assign d = 0
  endif

  # Default to 'th' suffix
  assign nth = 'th'

  # Determine correct ordinal suffix
  case d
    when 1
      assign nth = 'st'
    when 2
      assign nth = 'nd'
    when 3
      assign nth = 'rd'
  endcase
%}

<!-- Output the date 'November 3' -->
{{ myDate | date: '%B %e' -}}
<!-- Outputs our calculated suffix 'rd' -->
{{- nth }}
```

{% endraw %}
