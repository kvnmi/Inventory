import React from "react";
import renderer from "react-test-renderer";

import EditInventory from "../src/Screens/EditInventory";

describe("Edit Listing Screen", () => {
  const route = {
    params: {
      item: 1,
    },
  };
  const navigation = { navigate: jest.fn() };

  it("matches snapshot", () => {
    const tree = renderer
      .create(<EditInventory route={route} navigation={navigation} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
