<template>
  <div>
    <img :src="profilePicture" :alt="profile.login" />
    <h1>#{{ profile.id }} - {{ profile.login }}</h1>
    <a :href="profile.htmlUrl" target="_blank">
      {{ $t("workflow.profile.link") }}
    </a>

    <dl>
      <dt>First name</dt>
      <dd>{{ basicInformation.firstName }}</dd>

      <dt>Last name</dt>
      <dd>{{ basicInformation.lastName }}</dd>

      <dt>E-mail</dt>
      <dd>{{ terms.email }}</dd>
    </dl>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "WorkflowProfile",
  computed: {
    ...mapState("workflow", {
      profile: "github",
      basicInformation: "basicInformation",
      terms: "terms"
    }),
    profilePicture() {
      return this.profile.avatarUrl || "https://via.placeholder.com/460";
    }
  },
  created() {
    const params = { locale: this.$route.params.locale };
    if (this.basicInformation.validationErrors)
      return this.$router.push({
        name: "workflow-pages-basic-information",
        params
      });
    if (this.terms.validationErrors)
      return this.$router.push({ name: "workflow-pages-terms", params });
  }
};
</script>
