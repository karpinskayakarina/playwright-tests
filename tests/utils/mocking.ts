import { Route } from "@playwright/test";

type ProductListResponse = {
  data: Array<{ id: string; name: string; price: number }>;
};

async function fetchPageProducts(
  route: Route,
  pageNumber: number
): Promise<ProductListResponse> {
  const apiUrl = process.env.API_URL!;
  const response = await route.fetch({
    url: `${apiUrl}/products?page=${pageNumber}`,
  });
  return (await response.json()) as ProductListResponse;
}

export async function mockProductsResponse(route: Route) {
  const response = await route.fetch();
  const json = (await response.json()) as ProductListResponse;

  let combinedData = json.data;

  const secondPageData = await fetchPageProducts(route, 2);
  combinedData = combinedData.concat(secondPageData.data);

  const thirdPageData = await fetchPageProducts(route, 3);
  combinedData = combinedData.concat(thirdPageData.data);

  combinedData = combinedData.slice(0, 20);

  await route.fulfill({
    status: response.status(),
    contentType: "application/json",
    body: JSON.stringify({
      ...json,
      data: combinedData,
    }),
  });
}
