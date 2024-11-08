---
title: Blog styling and checking
tags:
  - cat
excerpt:
  This is a playground for blog styles. In theory this should never get
  deployed. However, I will probably accidentally push this live one day.
draft: true
---

---

### Headings

To create a heading, add number signs (`#`) in front of a word or phrase. The
number of number signs you use should correspond to the heading level. For
example, to create a heading level three (`<h3>`), use three number signs (e.g.
`### My Header`).

nb. in general we should never use any headings larger than h3, as the title of
the website is h1, and the title of the post is h2. This is driven by the
templates.

# h1 Heading

## h2 Heading

### h3 Heading

#### h4 Heading

##### h5 Heading

###### h6 Heading

---

### Horizontal Rules

To create a horizontal rule, use three or more asterisks (`***`), dashes
(`---`), or underscores (`___`) on a line by themselves.

---

### Blockquotes

To create a blockquote, add a `>` in front of a paragraph.

> Thou sodden-witted lord! thou hast no more brain than I have in mine elbows
>
> — Troilus and Cressida, Act 2 Scene 1, Lines 42-43; Thersites to Ajax

Blockquotes can contain other Markdown formatted elements. Not all elements can
be used — you'll need to experiment to see which ones work.

> #### The quarterly results look great!
>
> - Revenue was off the chart.
> - Profits were higher than ever.
>
> _Everything_ is going according to **plan**.

---

### Lists

To create an ordered list, add line items with numbers followed by periods. The
numbers don’t have to be in numerical order, but the list should start with the
number one.

#### Ordered Lists

1. First item
2. Second item
3. Third item
4. Fourth item

#### Nested Ordered Lists

1. First item
2. Second item
3. Third item
   1. Indented item
   2. Indented item
4. Fourth item

#### Unordered Lists

- First item
- Second item
- Third item
- Fourth item

#### Nested Unordered Lists

- First item
- Second item
- Third item
  - Indented item
  - Indented item
- Fourth item

---

### Code

To denote a word or phrase as code, enclose it in backtick (e.g., At the command
prompt, type `nano`.)

To create code blocks, wrap the code block with x3 backticks, syntax
highlighting can be added by specifything the language after the backticks. This
is handled by prism at build time.

```javascript
// This is some javascript code
const str = "Hello World";
console.log(str);
```

---

### Links

To create a link, enclose the link text in brackets (e.g., `[Duck Duck Go]`) and
then follow it immediately with the URL in parentheses (e.g.,
`(https://duckduckgo.com)`).

```
My favorite search engine is [Duck Duck Go](https://duckduckgo.com).
```

The rendered output looks like this:

My favorite search engine is [Duck Duck Go](https://duckduckgo.com).

---

### Images

Images should break out of the centre container. This should be the same for a
few other elements as well.

![image](https://images.pexels.com/photos/28220159/pexels-photo-28220159/free-photo-of-landscape-sunset-water-hill.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)

Videos should also be possible.

---

### Tables

To add a table in Markdown, use the vertical line `|` to separate each column,
and use three or more dashes `---` to create each column's header. A vertical
line should also be added at either end of the row.

Align text in the columns to the left, right, or center by adding a colon `:` to
the left, right, or on both side of the dashes `---` within the header row.

| Item              | In Stock | Price |
| :---------------- | :------: | ----: |
| Python Hat        |   True   | 23.99 |
| SQL Hat           |   True   | 23.99 |
| Codecademy Tee    |  False   | 19.99 |
| Codecademy Hoodie |  False   | 42.99 |
