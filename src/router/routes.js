import i18n from "@/i18n";

const Root = () =>
  Promise.resolve({ name: "Root", render: h => h("router-view") });

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
        component: () => import(/* webpackChunkName: "home" */ "@/views/Home")
      },
      {
        path: i18n.t("routes.stepper"),
        name: "stepper",
        component: () =>
          import(/* webpackChunkName: "stepper" */ "@/views/Stepper")
      },
      {
        path: i18n.t("routes.workflow"),
        component: () =>
          import(
            /* webpackChunkName: "workflow-pages" */ "@/views/workflow/Workflow"
          ),
        children: [
          {
            path: "",
            name: "workflow-pages-introduction",
            component: () =>
              import(
                /* webpackChunkName: "workflow-pages" */ "@/views/workflow/WorkflowIntroduction"
              )
          },
          {
            path: i18n.t("routes.workflow.basicInformation"),
            name: "workflow-pages-basic-information",
            component: () =>
              import(
                /* webpackChunkName: "workflow-pages" */ "@/views/workflow/WorkflowBasicInformation"
              )
          },
          {
            path: i18n.t("routes.workflow.terms"),
            name: "workflow-pages-terms",
            component: () =>
              import(
                /* webpackChunkName: "workflow-pages" */ "@/views/workflow/WorkflowTerms"
              )
          },
          {
            path: i18n.t("routes.workflow.profile"),
            name: "workflow-pages-profile",
            component: () =>
              import(
                /* webpackChunkName: "workflow-pages" */ "@/views/workflow/WorkflowProfile"
              )
          }
        ]
      }
    ]
  },
  {
    path: "*",
    component: () => import(/* webpackChunkName: "404" */ "@/views/404")
  }
];
