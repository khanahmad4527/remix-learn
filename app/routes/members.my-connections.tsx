import { Box } from "@mantine/core";
import { MembersBox, MembersPagination, SelectSetting } from "./members";
import type { LoaderFunctionArgs, ActionFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import axios from "axios";
import { useLoaderData } from "@remix-run/react";

export async function loader({ request }: LoaderFunctionArgs) {
  const searchParams = new URL(request.url).searchParams;

  const page = searchParams.get("page") || 1;

  console.log("my connection loader page is", page);

  const params = {
    _page: page,
    _limit: 5,
    category: searchParams.get("category") || "",
  };

  const { data } = await axios.get(
    `https://frail-jade-bison.cyclic.app/products`,
    {
      params,
    }
  );

  return json({ data });
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  const values = Object.fromEntries(formData);
  console.log(values);
  if (values) {
    return json({ values: "Hello" });
  }

  return null;
}

const Connections = () => {
  const { data } = useLoaderData();

  return (
    <Box>
      <SelectSetting />
      <MembersBox value={data.length || 1} data={data} />
      <MembersPagination />
    </Box>
  );
};

export default Connections;
