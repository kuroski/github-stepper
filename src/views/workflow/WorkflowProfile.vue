<template>
  <Profile
    :profile="profile"
    :basic-information="basicInformation"
    :terms="terms"
  />
</template>

<script>
import { mapState } from "vuex";
import Profile from "@/components/Profile";

export default {
  name: "WorkflowProfile",
  components: {
    Profile
  },
  computed: {
    ...mapState("workflow", {
      profile: "github",
      basicInformation: "basicInformation",
      terms: "terms"
    })
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
