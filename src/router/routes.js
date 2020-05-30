import i18n from "@/i18n";

const Root = () => Promise.resolve({ render: h => h("router-view") });

export default [
  {
    path: "/",
    redirect: i18n.locale
  },
  {
    path: "/:locale",
    component: Root,
    children: [
      {
        path: "",
        name: "home",
        component: () =>
          import(/* webpackChunkName: "home" */ "../views/Home.vue")
      }
    ]
  }
];
