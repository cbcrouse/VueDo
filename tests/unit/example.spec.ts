import { shallowMount } from "@vue/test-utils";
import Todos from "@/components/Todos.vue";

describe("Todos.vue", () => {
  it("renders props.msg when passed", () => {
    const msg = "new message";
    const wrapper = shallowMount(Todos, {
      propsData: { msg }
    });
    expect(wrapper.text()).toMatch(msg);
  });
});
