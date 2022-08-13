# Obsidian URL Shortener

This plugin you define urls within the YAML frontmatter area of your note, and then reference those urls within the current file.

## The problem

```

# Generator List

| Name      | URL                                                                                                                          | Notes |
| --------- | ---------------------------------------------------------------------------------------------------------------------------- | ----- |
| Wen       | [WEN](https://www.amazon.com/WEN-GN625i-Compliant-6250-Watt-Transfer-Switch-Ready/dp/B08H5VX1R7/)                            | $639  |
| Craftsman | [Craftsman](https://www.lowes.com/pd/CRAFTSMAN-5000-Watt-Gasoline-Portable-Generator-with-Briggs-Stratton-Engine/5013056477) | $749  |

```

When trying to put URLS within tables, it can be cumbersome to have to scroll all the way to the right to access cells after the URL cell.  Instead, we should be able to do

```
---
url.craftsman: https://www.lowes.com/pd/CRAFTSMAN-5000-Watt-Gasoline-Portable-Generator-with-Briggs-Stratton-Engine/5013056477
url.wen: https://www.amazon.com/WEN-GN625i-Compliant-6250-Watt-Transfer-Switch-Ready/dp/B08H5VX1R7/
---

# Generator List

| Name      | URL             | Notes |
| --------- | --------------- | ----- |
| Wen       | +url.wen+       | $639  | 
| Craftsman | +url.craftsman+ | $749  |

```

This lets you define urls you want to use in your note, and then use a special tag to refer to that url.  When hitting preview, the URL will change to the real one, letting you click on it as normal
