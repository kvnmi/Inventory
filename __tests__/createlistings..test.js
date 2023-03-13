import React from "react";
import renderer from "react-test-renderer";
import CreateInventory from "../src/Screens/CreateInventory";

describe("Create Listing Screen", () => {
  const route = {
    params: {
      item: 1,
    },
  };
  const navigation = { navigate: jest.fn() };

  it("matches snapshot", () => {
    const tree = renderer
      .create(<CreateInventory route={route} navigation={navigation} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
