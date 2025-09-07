import { Route } from "@playwright/test";
import { API_BASE_URL } from "../config/api.config";

type Product = { id: string; name: string; price: number };
type ProductListResponse = { data: Product[] };

async function fetchPageProducts(
  route: Route,
  pageNumber: number
): Promise<ProductListResponse> {
  const response = await route.fetch({
    url: `${API_BASE_URL}/products?page=${pageNumber}`,
  });
  return (await response.json()) as ProductListResponse;
}

export async function mockProductsResponse(route: Route) {
  const response = await route.fetch();
  const json = (await response.json()) as ProductListResponse;

  let combinedData = json.data;

  const secondPage = await fetchPageProducts(route, 2);
  combinedData = combinedData.concat(secondPage.data);

  const thirdPage = await fetchPageProducts(route, 3);
  combinedData = combinedData.concat(thirdPage.data);

  combinedData = combinedData.slice(0, 20);

  await route.fulfill({
    status: 200,
    contentType: "application/json",
    body: JSON.stringify({ data: combinedData }),
  });
}
