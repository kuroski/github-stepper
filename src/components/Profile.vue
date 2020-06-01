<template>
  <div class="profile">
    <div class="profile__card">
      <img :src="profilePicture" :alt="profile.login" class="rounded-lg" />
      <div class="profile__card-content">
        <h2>
          {{ fullName }}
        </h2>
        <p>{{ terms.email }}</p>
        <a :href="profile.htmlUrl" target="_blank">
          {{ $t("workflow.profile.link", { username: profile.login }) }}
        </a>
      </div>
    </div>

    <LocalizedLink :to="{ name: 'home' }" type="secondary">
      {{ $t("workflow.backToHomePage") }}
    </LocalizedLink>
  </div>
</template>

<script>
import LocalizedLink from "@/components/LocalizedLink";

export default {
  name: "WorkflowProfile",
  components: {
    LocalizedLink
  },
  props: {
    profile: {
      type: Object,
      required: true
    },
    basicInformation: {
      type: Object,
      required: true
    },
    terms: {
      type: Object,
      required: true
    }
  },
  computed: {
    profilePicture() {
      return this.profile.avatarUrl || "https://via.placeholder.com/460";
    },
    fullName() {
      return `${this.basicInformation.firstName} ${this.basicInformation.lastName}`;
    }
  }
};
</script>

<style scoped>
.profile {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.profile > a {
  margin-top: var(--space-10);
  align-self: center;
}

.profile__card {
  display: flex;
  align-items: center;
  width: 100%;
}

.profile__card > img {
  width: 5.5rem;
  height: 5.5rem;
  margin-right: var(--space-4);
}

.profile__card-content > h2 {
  font-weight: var(--font-semibold);
  margin: 0;
  color: var(--color-blue-700);
}

.profile__card-content > p {
  margin-top: 0;
  margin-bottom: var(--space-2);
  font-weight: var(--font-light);
}
</style>
