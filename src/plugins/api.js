import { guard, string, object, number, nullable, email, map } from "decoders";
import env from "@/env";

const apiUrl = env.API_URL;

const profile = object({
  id: number,
  avatar_url: string,
  html_url: string,
  login: string,
  email: nullable(email)
});
const githubProfileDecoder = guard(
  map(profile, ({ avatar_url, html_url, ...rest }) => ({
    ...rest,
    avatarUrl: avatar_url,
    htmlUrl: html_url
  }))
);

const apiFactory = axios => ({
  getByUsername: username =>
    axios
      .$get(`${apiUrl}/users/${username}`)
      .then(githubProfileDecoder, error => Promise.reject(error))
});

export default ({ $axios }, inject) => inject("api", apiFactory($axios));
