import * as Icons from "../icons";

export const NAV_DATA = [
  {
    label: "MAIN MENU",
    items: [
      {
        title: "Dashboard",
        icon: Icons.HomeIcon,
        items: [
          {
            title: "System Overview",
            url: "/",
          },
        ],
      },
      {
        title: "Transactions",
        url: "/calendar",
        icon: Icons.Calendar,
        items: [],
      },
      {
        title: "Users",
        url: "/profile",
        icon: Icons.User,
        items: [],
      },
      {
        title: "Write to user",
        icon: Icons.Alphabet,
        items: [
          {
            title: "Attention Update",
            url: "/forms/form-elements",
          },
          {
            title: "Warning commands",
            url: "/forms/form-layout",
          },
        ],
      },
      {
        title: "Referrals Operations",
        url: "/tables",
        icon: Icons.Table,
        items: [
          {
            title: "Income Overview & Action",
            url: "/tables",
          },
        ],
      },
      {
        title: "Pages",
        icon: Icons.Alphabet,
        items: [
          {
            title: "Settings",
            url: "/pages/settings",
          },
          {
            title: "Site actions",
            url: "/pages/settings",
          },
        ],
      },
    ],
  },
  {
    label: "PAYMENTS",
    items: [
      {
        title: "Charts",
        icon: Icons.PieChart,
        items: [
          {
            title: "All Chart",
            url: "/charts/basic-chart",
          },
        ],
      },
      {
        title: "Branches & action",
        icon: Icons.FourCircle,
        items: [
          {
            title: "Smsglobe users",
            url: "/ui-elements/alerts",
          },
          {
            title: "Restrict or bann account",
            url: "/ui-elements/buttons",
          },
        ],
      },
      {
        title: "Authentication",
        icon: Icons.Authentication,
        items: [
          {
            title: "Sign In",
            url: "/auth/sign-in",
          },
        ],
      },
    ],
  },
];
