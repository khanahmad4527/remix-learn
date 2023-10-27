import { Box } from "@mantine/core";
import { MembersBox, MembersPagination, SelectSetting } from "./members";
import type { LoaderFunctionArgs } from "@remix-run/node";

export async function loader({ request }: LoaderFunctionArgs) {
  const searchParams = new URL(request.url).searchParams;

  const page = searchParams.get("page") || 1;
  console.log("all-members loader page is ", page);
  return null;
}

export async function action() {
  console.log("all-members action");
  return null;
}

const AllMembers = () => {
  return (
    <Box>
      <SelectSetting />
      <MembersBox value={7} data={[]} />
      <MembersPagination />
    </Box>
  );
};

export default AllMembers;
