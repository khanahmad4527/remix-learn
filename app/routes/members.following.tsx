import { Box } from "@mantine/core";
import { MembersBox, MembersPagination, SelectSetting } from "./members";

export async function loader() {
  console.log("following loader");
  return null;
}

export async function action() {
  console.log("following action");
  return null;
}

const Following = () => {
  return (
    <Box>
      <SelectSetting />
      <MembersBox value={5} data={[]}/>
      <MembersPagination />
    </Box>
  );
};

export default Following;
