// ---------------------------------------------------------------------------
// SITE CONTENT — every text, image and video on the page comes from here.
// Images live in /public/images (site/, brand/, products/); swap a `src` to change one.
// Videos are empty strings: drop an .mp4 in /public/videos and set the path,
// until then the poster/placeholder image is shown (and scrubbed/zoomed).
// ---------------------------------------------------------------------------

export default {
  "seo": {
    "title": "ONDO 온도 — Daily & Work Wear",
    "description": "Placeholder description."
  },
  "tagline": "Warmth in everyday wear",
  "navigation": {
    "ctas": [
      {
        "url": "/product.html?p=on-cropped-cardigan",
        "label": "Shop\nWomen"
      },
      {
        "url": "/product.html?p=gyeol-chore-jacket",
        "label": "Shop\nMen"
      }
    ]
  },
  "footer": [
    {
      "url": "#",
      "text": "Legal notice"
    }
  ],
  "hero": {
    "label": "Intro",
    "intro": {
      "video": "/videos/hero-intro.mp4",
      "poster": "/images/brand/01-hero-street.webp",
      "ctaPrimary": "Enter"
    },
    "scroll": {
      "video": "/videos/hero-scroll.mp4",
      "poster": "/images/brand/02-store-entrance.webp",
      "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua: ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor.",
      "label": "Scroll"
    }
  },
  "shirts": {
    "label": "Products",
    "title": "More than a uniform, a quiet way of being.",
    "shirts": [
      {
        "video": "",
        "image": "/images/products/gyeol-chore-jacket/cutout.webp",
        "column": "/images/products/plinth.webp"
      },
      {
        "video": "",
        "image": "/images/products/bit-oxford-shirt/cutout.webp",
        "column": "/images/products/plinth.webp"
      }
    ]
  },
  "story": {
    "label": "Story",
    "archs": [
      {
        "video": "/videos/ch1.mp4",
        "videoWebm": "",
        "videoMobile": "",
        "videoMobileWebm": "",
        "poster": "/images/posters/ch1.jpg",
        "chapter": {
          "label": "Chapter I",
          "title": "Chapter One",
          "bgColor": "light-gold",
          "panels": [
            {
              "type": "normal",
              "bgColor": "light-gold",
              "items": [
                {
                  "alignment": "top",
                  "image": {
                    "src": "/images/brand/03-woman-office.webp",
                    "width": 1280,
                    "height": 1920,
                    "alt": null
                  },
                  "title": "Lorem ipsum dolor",
                  "text": "Reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat.",
                  "cursor": null,
                  "modal": null
                },
                {
                  "alignment": "top",
                  "image": {
                    "src": "/images/brand/04-man-hanok.webp",
                    "width": 1280,
                    "height": 1920,
                    "alt": null
                  },
                  "title": "Sit amet consectetur",
                  "text": "Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum lorem ipsum dolor sit amet consectetur adipiscing.",
                  "cursor": {
                    "label1": "First",
                    "label2": "Name 2"
                  },
                  "modal": {
                    "title": "First Name 2",
                    "text": "Role\nSubtitle",
                    "cta": {
                      "url": "/product.html?p=gyeol-chore-jacket",
                      "label1": "Shop",
                      "label2": "the look",
                      "icon": "IconCart"
                    },
                    "st": false,
                    "list": [
                      {
                        "label": "Member since",
                        "text": "2024"
                      }
                    ]
                  }
                },
                {
                  "alignment": "top",
                  "image": {
                    "src": "/images/brand/05-flatlay.webp",
                    "width": 1440,
                    "height": 1920,
                    "alt": null
                  },
                  "title": "Adipiscing elit sed",
                  "text": "Adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla.",
                  "cursor": null,
                  "modal": null
                },
                {
                  "alignment": "bottom",
                  "image": {
                    "src": "/images/site/00.webp",
                    "width": 1280,
                    "height": 1920,
                    "alt": null
                  },
                  "title": null,
                  "text": null,
                  "cursor": {
                    "label1": "First",
                    "label2": null
                  },
                  "modal": {
                    "title": "First Name 4",
                    "text": "Role\nSubtitle",
                    "cta": {
                      "url": "/product.html?p=bit-oxford-shirt",
                      "label1": "Shop",
                      "label2": "the look",
                      "icon": "IconCart"
                    },
                    "st": false,
                    "list": [
                      {
                        "label": "Member since",
                        "text": "2024"
                      }
                    ]
                  }
                }
              ]
            },
            {
              "type": "fullscreen",
              "item": {
                "alignment": "bottom",
                "image": {
                  "src": "/images/site/01.webp",
                  "width": 1920,
                  "height": 1280,
                  "alt": null
                },
                "title": "Eiusmod tempor",
                "text": "Do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum lorem ipsum dolor sit amet consectetur adipiscing."
              }
            }
          ]
        }
      },
      {
        "video": "/videos/ch2.mp4",
        "videoWebm": "",
        "videoMobile": "",
        "videoMobileWebm": "",
        "poster": "/images/posters/ch2.jpg",
        "chapter": {
          "label": "Chapter II",
          "title": "Chapter Two",
          "bgColor": "dark-gray",
          "panels": [
            {
              "type": "normal",
              "bgColor": "light-gold",
              "items": [
                {
                  "alignment": "top",
                  "image": {
                    "src": "/images/brand/06-atelier.webp",
                    "width": 1920,
                    "height": 1440,
                    "alt": "Placeholder image"
                  },
                  "title": "Incididunt ut labore",
                  "text": "Laborum lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip.",
                  "cursor": null,
                  "modal": null
                },
                {
                  "alignment": "top",
                  "image": {
                    "src": "/images/site/02.webp",
                    "width": 1280,
                    "height": 1920,
                    "alt": "ONDO campaign photo"
                  },
                  "title": "Magna aliqua",
                  "text": "Incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum lorem ipsum.",
                  "cursor": {
                    "label1": "First",
                    "label2": "Name 6"
                  },
                  "modal": {
                    "title": "First Name 6",
                    "text": "Role\nSubtitle",
                    "cta": {
                      "url": "/product.html?p=jul-pleated-trouser",
                      "label1": "Shop",
                      "label2": "the look",
                      "icon": "IconCart"
                    },
                    "st": true,
                    "list": [
                      {
                        "label": "Member since",
                        "text": "2024"
                      }
                    ]
                  }
                }
              ]
            },
            {
              "type": "normal",
              "bgColor": "dark-gray",
              "items": [
                {
                  "alignment": "top",
                  "image": {
                    "src": "/images/site/03.webp",
                    "width": 1280,
                    "height": 1920,
                    "alt": "ONDO campaign photo"
                  },
                  "title": "Enim ad minim veniam",
                  "text": "Cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation.",
                  "cursor": {
                    "label1": "First",
                    "label2": "Name 7"
                  },
                  "modal": {
                    "title": "First Name 7",
                    "text": "Role\nSubtitle",
                    "cta": {
                      "url": "/product.html?p=on-cropped-cardigan",
                      "label1": "Shop",
                      "label2": "the look",
                      "icon": "IconCart"
                    },
                    "st": true,
                    "list": [
                      {
                        "label": "Member since",
                        "text": "2024"
                      }
                    ]
                  }
                }
              ]
            },
            {
              "type": "fullscreen",
              "item": {
                "alignment": "bottom",
                "image": {
                  "src": "/images/site/04.webp",
                  "width": 1920,
                  "height": 1280,
                  "alt": "ONDO campaign photo"
                },
                "title": "Quis nostrud",
                "text": "Elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum lorem ipsum dolor sit amet."
              }
            }
          ]
        }
      },
      {
        "video": "/videos/ch3.mp4",
        "videoWebm": "",
        "videoMobile": "",
        "videoMobileWebm": "",
        "poster": "/images/posters/ch3.jpg",
        "chapter": {
          "label": "Chapter III",
          "title": "Chapter Three",
          "bgColor": "dark-gray",
          "panels": [
            {
              "type": "normal",
              "bgColor": "light-gold",
              "items": [
                {
                  "alignment": "top",
                  "image": {
                    "src": "/images/site/05.webp",
                    "width": 1080,
                    "height": 1920,
                    "alt": null
                  },
                  "title": "Ullamco laboris",
                  "text": "Mollit anim id est laborum lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure.",
                  "cursor": null,
                  "modal": null
                },
                {
                  "alignment": "top",
                  "image": {
                    "src": "/images/site/06.webp",
                    "width": 1280,
                    "height": 1920,
                    "alt": null
                  },
                  "title": "Lorem ipsum dolor",
                  "text": "Ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt.",
                  "cursor": null,
                  "modal": null
                },
                {
                  "alignment": "top",
                  "image": {
                    "src": "/images/site/07.webp",
                    "width": 1920,
                    "height": 1280,
                    "alt": "ONDO campaign photo"
                  },
                  "title": null,
                  "text": null,
                  "cursor": null,
                  "modal": null
                }
              ]
            },
            {
              "type": "normal",
              "bgColor": "dark-gray",
              "items": [
                {
                  "alignment": "bottom",
                  "image": {
                    "src": "/images/site/08.webp",
                    "width": 1920,
                    "height": 1280,
                    "alt": null
                  },
                  "title": "Sit amet consectetur",
                  "text": "Amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum lorem ipsum dolor sit amet consectetur.",
                  "cursor": null,
                  "modal": null
                },
                {
                  "alignment": "top",
                  "image": {
                    "src": "/images/site/09.webp",
                    "width": 1280,
                    "height": 1920,
                    "alt": "ONDO campaign photo"
                  },
                  "title": null,
                  "text": null,
                  "cursor": {
                    "label1": "First",
                    "label2": "Name 12"
                  },
                  "modal": {
                    "title": "First Name 12",
                    "text": "Role\nSubtitle",
                    "cta": {
                      "url": "/product.html?p=gyeol-chore-jacket",
                      "label1": "Shop",
                      "label2": "the look",
                      "icon": "IconCart"
                    },
                    "st": false,
                    "list": [
                      {
                        "label": "Member since",
                        "text": "2024"
                      }
                    ]
                  }
                }
              ]
            },
            {
              "type": "normal",
              "bgColor": "light-gold",
              "items": [
                {
                  "alignment": "top",
                  "image": {
                    "src": "/images/site/10.webp",
                    "width": 1280,
                    "height": 1920,
                    "alt": "ONDO campaign photo"
                  },
                  "title": "Adipiscing elit sed",
                  "text": "Tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat.",
                  "cursor": null,
                  "modal": null
                },
                {
                  "alignment": "top",
                  "image": {
                    "src": "/images/site/11.webp",
                    "width": 1280,
                    "height": 1920,
                    "alt": "ONDO campaign photo"
                  },
                  "title": null,
                  "text": null,
                  "cursor": null,
                  "modal": null
                }
              ]
            },
            {
              "type": "fullscreen",
              "item": {
                "alignment": "bottom",
                "image": {
                  "src": "/images/site/12.webp",
                  "width": 1920,
                  "height": 1280,
                  "alt": null
                },
                "title": "Eiusmod tempor",
                "text": "Cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore."
              }
            }
          ]
        }
      }
    ]
  },
  "video": {
    "label": "Film",
    "cursorLabel1": "Watch the film",
    "cursorLabel2": "Watch the film",
    "video": "/videos/film.mp4",
    "videoMobile": "",
    "poster": "/images/brand/10-rooftop.webp",
    "teaser": "/videos/film-teaser.mp4"
  },
  "collection": {
    "title1": "Discover",
    "title2": "the full collection",
    "image1": {
      "src": "/images/brand/07-woman-gallery.webp",
      "width": 1280,
      "height": 1920,
      "alt": null
    },
    "image2": {
      "src": "/images/brand/08-man-stairs.webp",
      "width": 1280,
      "height": 1920,
      "alt": "Placeholder image"
    },
    "imageMobile": {
      "src": "/images/site/13.webp",
      "width": 1280,
      "height": 1920,
      "alt": "ONDO campaign photo"
    },
    "text1": "On Cropped\nCardigan",
    "text2": "Gyeol Chore\nJacket",
    "cta1": {
      "url": "/product.html?p=on-cropped-cardigan",
      "label1": "View",
      "label2": "the product"
    },
    "cta2": {
      "url": "/product.html?p=gyeol-chore-jacket",
      "label1": "View",
      "label2": "the product"
    },
    "gallery": [
      {
        "src": "/images/site/14.webp",
        "width": 1280,
        "height": 1920,
        "alt": "ONDO campaign photo"
      },
      {
        "src": "/images/site/15.webp",
        "width": 1280,
        "height": 1920,
        "alt": "ONDO campaign photo"
      },
      {
        "src": "/images/site/16.webp",
        "width": 1280,
        "height": 1920,
        "alt": null
      },
      {
        "src": "/images/site/17.webp",
        "width": 1280,
        "height": 1920,
        "alt": "ONDO campaign photo"
      },
      {
        "src": "/images/site/18.webp",
        "width": 1280,
        "height": 1920,
        "alt": "ONDO campaign photo"
      },
      {
        "src": "/images/site/19.webp",
        "width": 1280,
        "height": 1920,
        "alt": "ONDO campaign photo"
      },
      {
        "src": "/images/site/20.webp",
        "width": 1280,
        "height": 1920,
        "alt": "ONDO campaign photo"
      },
      {
        "src": "/images/site/21.webp",
        "width": 1280,
        "height": 1920,
        "alt": "ONDO campaign photo"
      },
      {
        "src": "/images/site/22.webp",
        "width": 1280,
        "height": 1920,
        "alt": "ONDO campaign photo"
      },
      {
        "src": "/images/site/23.webp",
        "width": 1280,
        "height": 1920,
        "alt": "ONDO campaign photo"
      }
    ],
    "ctaShopTFC": {
      "url": "/product.html?p=on-cropped-cardigan",
      "label": "Shop women"
    },
    "ctaShopST": {
      "url": "/product.html?p=gyeol-chore-jacket",
      "label": "Shop men"
    },
    "label": "Collection"
  },
  "weekend": {
    "isOver": true,
    "imageTeams": null,
    "title1": "Meet us",
    "title2": "at the venue",
    "caption": "The\nweekend",
    "ticket1": {
      "date": "2026-04-25 21:05:00",
      "scoreToulouse": 2,
      "scoreOpponent": 2,
      "cta": {
        "url": "#",
        "label": "Get tickets"
      },
      "teams": [
        {
          "name": "Team One",
          "logo": "A"
        },
        {
          "name": "Team Two",
          "logo": "B"
        }
      ]
    },
    "ticket2": {
      "date": "2026-04-26 21:05:00",
      "scoreToulouse": 24,
      "scoreOpponent": 27,
      "cta": {
        "url": "#",
        "label": "Get tickets"
      },
      "teams": [
        {
          "name": "Team Three",
          "logo": "C"
        },
        {
          "name": "Team Four",
          "logo": "D"
        }
      ]
    },
    "label": "Tickets",
    "video": "/videos/event.mp4",
    "poster": "/images/posters/event.jpg"
  },
  "medias": {
    "catchphrase": "Press",
    "items": [
      {
        "type": "image",
        "src": "/images/site/26.webp",
        "width": 1280,
        "height": 1920,
        "alt": null,
        "modal": null
      },
      {
        "type": "image",
        "src": "/images/site/27.webp",
        "width": 1280,
        "height": 1920,
        "alt": null,
        "modal": null
      },
      {
        "type": "image",
        "src": "/images/site/28.webp",
        "width": 1920,
        "height": 1280,
        "alt": null,
        "modal": null
      },
      {
        "type": "image",
        "src": "/images/site/29.webp",
        "width": 1280,
        "height": 1920,
        "alt": null,
        "modal": {
          "quote": "Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt.",
          "title": "Full Name",
          "subtitle": "Role, Organisation",
          "cta": null
        }
      },
      {
        "type": "image",
        "src": "/images/site/30.webp",
        "width": 1440,
        "height": 1920,
        "alt": null,
        "modal": null
      },
      {
        "type": "image",
        "src": "/images/site/31.webp",
        "width": 1280,
        "height": 1920,
        "alt": null,
        "modal": {
          "quote": "Dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam.",
          "title": "Full Name",
          "subtitle": "Role, Organisation",
          "cta": null
        }
      },
      {
        "type": "image",
        "src": "/images/site/32.webp",
        "width": 1440,
        "height": 1920,
        "alt": null,
        "modal": null
      },
      {
        "type": "image",
        "src": "/images/site/33.webp",
        "width": 1280,
        "height": 1920,
        "alt": null,
        "modal": null
      },
      {
        "type": "image",
        "src": "/images/site/34.webp",
        "width": 1440,
        "height": 1920,
        "alt": "ONDO campaign photo",
        "modal": null
      },
      {
        "type": "image",
        "src": "/images/site/35.webp",
        "width": 1280,
        "height": 1920,
        "alt": null,
        "modal": null
      },
      {
        "type": "image",
        "src": "/images/site/36.webp",
        "width": 1920,
        "height": 1280,
        "alt": null,
        "modal": null
      },
      {
        "type": "image",
        "src": "/images/site/37.webp",
        "width": 1440,
        "height": 1920,
        "alt": null,
        "modal": null
      },
      {
        "type": "image",
        "src": "/images/site/38.webp",
        "width": 1440,
        "height": 1920,
        "alt": null,
        "modal": null
      },
      {
        "type": "image",
        "src": "/images/site/39.webp",
        "width": 1280,
        "height": 1920,
        "alt": null,
        "modal": null
      },
      {
        "type": "image",
        "src": "/images/site/40.webp",
        "width": 1280,
        "height": 1920,
        "alt": null,
        "modal": null
      },
      {
        "type": "image",
        "src": "/images/site/41.webp",
        "width": 1920,
        "height": 1280,
        "alt": null,
        "modal": null
      },
      {
        "type": "image",
        "src": "/images/site/42.webp",
        "width": 1280,
        "height": 1920,
        "alt": null,
        "modal": null
      },
      {
        "type": "image",
        "src": "/images/site/43.webp",
        "width": 1920,
        "height": 1280,
        "alt": null,
        "modal": null
      },
      {
        "type": "image",
        "src": "/images/site/44.webp",
        "width": 1920,
        "height": 1280,
        "alt": null,
        "modal": null
      },
      {
        "type": "image",
        "src": "/images/site/45.webp",
        "width": 1920,
        "height": 1280,
        "alt": null,
        "modal": null
      },
      {
        "type": "image",
        "src": "/images/site/46.webp",
        "width": 1280,
        "height": 1920,
        "alt": null,
        "modal": null
      },
      {
        "type": "image",
        "src": "/images/site/47.webp",
        "width": 1280,
        "height": 1920,
        "alt": null,
        "modal": null
      },
      {
        "type": "image",
        "src": "/images/site/48.webp",
        "width": 1920,
        "height": 1280,
        "alt": null,
        "modal": null
      },
      {
        "type": "image",
        "src": "/images/site/49.webp",
        "width": 1280,
        "height": 1920,
        "alt": null,
        "modal": null
      },
      {
        "type": "image",
        "src": "/images/site/50.webp",
        "width": 1920,
        "height": 1280,
        "alt": null,
        "modal": null
      },
      {
        "type": "image",
        "src": "/images/site/51.webp",
        "width": 1280,
        "height": 1920,
        "alt": null,
        "modal": null
      },
      {
        "type": "image",
        "src": "/images/site/52.webp",
        "width": 1920,
        "height": 1280,
        "alt": null,
        "modal": null
      },
      {
        "type": "image",
        "src": "/images/site/53.webp",
        "width": 1280,
        "height": 1920,
        "alt": null,
        "modal": null
      },
      {
        "type": "image",
        "src": "/images/site/54.webp",
        "width": 1280,
        "height": 1920,
        "alt": null,
        "modal": null
      },
      {
        "type": "image",
        "src": "/images/site/55.webp",
        "width": 1920,
        "height": 1280,
        "alt": null,
        "modal": null
      },
      {
        "type": "image",
        "src": "/images/site/56.webp",
        "width": 1920,
        "height": 1280,
        "alt": null,
        "modal": null
      },
      {
        "type": "image",
        "src": "/images/site/57.webp",
        "width": 1920,
        "height": 1280,
        "alt": null,
        "modal": null
      },
      {
        "type": "image",
        "src": "/images/site/58.webp",
        "width": 1920,
        "height": 1280,
        "alt": null,
        "modal": null
      }
    ],
    "label": "Press"
  },
  "shops": {
    "title1": "Warmth in",
    "title2": "everyday wear",
    "subtitle1": "Seoul\nWomen",
    "subtitle2": "Seoul\nMen",
    "image": {
      "src": "/images/brand/09-group.webp",
      "width": 1920,
      "height": 939,
      "alt": "Placeholder image"
    },
    "shopTFC": {
      "title": "Women",
      "image": {
        "src": "/images/site/24.webp",
        "width": 1353,
        "height": 1920,
        "alt": "ONDO campaign photo"
      },
      "imageMobile": null,
      "cta": {
        "url": "/product.html?p=on-cropped-cardigan",
        "label": "Discover women"
      },
      "link": {
        "url": "#",
        "label": "Tickets"
      },
      "website": {
        "url": "#",
        "label": "Website"
      },
      "socials": {
        "label": "Follow ONDO",
        "list": [
          {
            "type": "Instagram",
            "url": "#"
          },
          {
            "type": "Tiktok",
            "url": "#"
          },
          {
            "type": "Facebook",
            "url": "#"
          },
          {
            "type": "Twitter",
            "url": "#"
          },
          {
            "type": "Youtube",
            "url": "#"
          },
          {
            "type": "Whatsapp",
            "url": "#"
          },
          {
            "type": "Linkedin",
            "url": "#"
          }
        ]
      }
    },
    "shopST": {
      "title": "Men",
      "image": {
        "src": "/images/site/25.webp",
        "width": 1440,
        "height": 1920,
        "alt": "ONDO campaign photo"
      },
      "imageMobile": null,
      "cta": {
        "url": "/product.html?p=gyeol-chore-jacket",
        "label": "Discover men"
      },
      "link": {
        "url": "#",
        "label": "Tickets"
      },
      "website": {
        "url": "#",
        "label": "Website"
      },
      "socials": {
        "label": "Follow ONDO",
        "list": [
          {
            "type": "Twitter",
            "url": "#"
          },
          {
            "type": "Facebook",
            "url": "#"
          },
          {
            "type": "Youtube",
            "url": "#"
          },
          {
            "type": "Twitch",
            "url": "#"
          },
          {
            "type": "Instagram",
            "url": "#"
          },
          {
            "type": "Linkedin",
            "url": "#"
          },
          {
            "type": "Tiktok",
            "url": "#"
          },
          {
            "type": "Whatsapp",
            "url": "#"
          }
        ]
      }
    },
    "label": "Shops"
  }
};
