import Vue from "vue";
import axios from "axios";
import registerPlugins from "@/plugins";

jest.mock("axios");

describe("Plugins module", () => {
  it("extends axios base functions", () => {
    const properties = [
      "$request",
      "$delete",
      "$get",
      "$head",
      "$options",
      "$post",
      "$put",
      "$patch"
    ];

    registerPlugins({});
    properties.forEach(property => expect(axios).toHaveProperty(property));
  });

  it("registers a $api instance in Vue prototype", () => {
    const store = {};
    registerPlugins(store);

    expect(store).toHaveProperty("$api");
    expect(Vue.prototype).toHaveProperty("$api");
  });
});
