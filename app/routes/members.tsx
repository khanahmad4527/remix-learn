import {
  Avatar,
  Box,
  Button,
  Card,
  Center,
  Container,
  Flex,
  Grid,
  Group,
  Image,
  NativeSelect,
  Pagination,
  Paper,
  SimpleGrid,
  Stack,
  Tabs,
  Text,
  TextInput,
  Title,
  Tooltip,
} from "@mantine/core";
import {
  redirect,
  type ActionFunctionArgs,
  type MetaFunction,
  json,
} from "@remix-run/node";
import {
  Form,
  Link,
  Outlet,
  useFetcher,
  useLocation,
  useSearchParams,
} from "@remix-run/react";
import {
  IconChevronDown,
  IconGridDots,
  IconList,
  IconZoomReset,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";
import type { LoaderFunctionArgs } from "react-router";

export const meta: MetaFunction = () => {
  return [
    { title: "Members - Online Communities" },
    { name: "description", content: "Welcome to Online Communities!" },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const url = request.url;
  const pathnameArr = url.split("/");
  const value = pathnameArr[pathnameArr.length - 1];

  // const defaultValue = ["all-members", "my-connections", "following"];
  // if (!defaultValue.includes(value)) {
  //   return redirect(`/members/all-members`);
  // }

  return json({ value });
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  const values = Object.fromEntries(formData);

  console.log("members");

  console.log("values", values);

  return null;
}

/********************************************COMPONENTS********************************************/

/*============================MembersCard============================*/

const MembersCard = ({ data }: any) => {
  const stats = [
    { value: "34K", label: "Followers" },
    { value: "187", label: "Follows" },
    { value: "1.6K", label: "Posts" },
  ];

  const items = stats.map((stat) => (
    <div key={stat.label}>
      <Text ta="center" fz="lg" fw={500}>
        {stat.value}
      </Text>
      <Text ta="center" fz="sm" c="dimmed" lh={1}>
        {stat.label}
      </Text>
    </div>
  ));

  return (
    <Card
      withBorder
      padding="xl"
      radius="md"
      style={{ backgroundColor: "white" }}
      className="card"
    >
      <Box h={200}>
        <Image fit="contain" src={data?.images[0]} />
      </Box>

      <Avatar
        src="https://images.unsplash.com/photo-1623582854588-d60de57fa33f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80"
        size={80}
        radius={80}
        mx="auto"
        mt={-30}
        style={{
          border: "2px solid white",
        }}
      />
      <Text ta="center" fz="lg" fw={500} mt="sm">
        {data?.brand}
      </Text>
      <Text ta="center" fz="sm" c="dimmed">
        Fullstack engineer
      </Text>
      <Group mt="md" justify="center" gap={30}>
        {items}
      </Group>

      <Group grow>
        <Button fullWidth radius="md" mt="xl" size="md" variant="default">
          Follow
        </Button>

        <Button fullWidth radius="md" mt="xl" size="md" variant="default">
          Send message
        </Button>
      </Group>
    </Card>
  );
};

/*============================MembersBox============================*/

export const MembersBox = ({
  value = 10,
  data,
}: {
  value: number;
  data: any;
}) => {
  return (
    <SimpleGrid mb={"md"} cols={{ base: 1, xs: 2, sm: 1, md: 2, xl: 3 }}>
      {new Array(value).fill("*").map((card, index) => {
        return <MembersCard key={index} data={data[index]} />;
      })}
    </SimpleGrid>
  );
};

/*============================SelectSetting============================*/

export const SelectSetting = () => {
  const { pathname } = useLocation();
  const pathnameArr = pathname.split("/");
  const value = pathnameArr[pathnameArr.length - 1];

  const [searchParams, setSearchParams] = useSearchParams();
  const [category, setCategory] = useState<string>(
    searchParams.get("category") || "air_conditioner"
  );

  useEffect(() => {
    const params = {
      page: searchParams.get("page") || 1,
      category: category,
    };

    setSearchParams(params);
  }, [category, searchParams, setSearchParams]);

  return (
    <Flex align={"center"} justify={"flex-end"} gap={"sm"} mb={"md"}>
      <NativeSelect
        // onChange={(e) => {
        //   fetcher.submit(
        //     { selected: e.target.value },
        //     { method: "post", action: `/members/${value}` }
        //   );
        // }}
        onChange={(e) => setCategory(e.target.value)}
        data={["air_conditioner", "beds", "dining_tables"]}
        rightSection={<IconChevronDown size="12px" />}
      />

      <Tooltip
        label={"Grid View"}
        withArrow
        arrowSize={8}
        color="black"
        transitionProps={{ transition: "pop", duration: 300 }}
      >
        <Paper withBorder>
          <Center p={"5px"}>
            <IconGridDots />
          </Center>
        </Paper>
      </Tooltip>

      <Tooltip
        label={"List View"}
        withArrow
        arrowSize={8}
        color="black"
        transitionProps={{ transition: "pop", duration: 300 }}
      >
        <Paper withBorder>
          <Center p={"5px"}>
            <IconList />
          </Center>
        </Paper>
      </Tooltip>
    </Flex>
  );
};

/*============================MembersPagination============================*/

export const MembersPagination = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activePage, setPage] = useState<number>(
    Number(searchParams.get("page")) || 1
  );

  useEffect(() => {
    const params = {
      page: activePage,
      category: searchParams.get("category") || "air_conditioner",
    };

    setSearchParams(params);
  }, [activePage, searchParams, setSearchParams]);
  return (
    <Flex align={"center"} justify={"space-between"}>
      <Text size={"sm"}>Viewing 1 - 20 of 22 members</Text>

      <Pagination
        color="orange"
        value={activePage}
        onChange={setPage}
        total={2}
      />
    </Flex>
  );
};

/*============================MembersTab============================*/

const MembersTab = () => {
  const { pathname } = useLocation();
  const pathnameArr = pathname.split("/");
  const value = pathnameArr[pathnameArr.length - 1];

  return (
    <Tabs color="orange" defaultValue={value}>
      <Tabs.List maw={"max-content"} mb={"md"}>
        <Flex wrap={"wrap"}>
          <Link to={"/members/all-members"}>
            <Tabs.Tab
              value="all-members"
              rightSection={<TabListValue value={22} />}
            >
              All Members
            </Tabs.Tab>
          </Link>

          <Link to={"/members/my-connections"}>
            <Tabs.Tab
              value="my-connections"
              rightSection={<TabListValue value={12} />}
            >
              My Connections
            </Tabs.Tab>
          </Link>

          <Link to={"/members/following"}>
            <Tabs.Tab
              value="following"
              rightSection={<TabListValue value={16} />}
            >
              Following
            </Tabs.Tab>
          </Link>
        </Flex>
      </Tabs.List>

      <Tabs.Panel value={value}>
        <Outlet />
      </Tabs.Panel>
    </Tabs>
  );
};

/*============================TabListValue============================*/

const TabListValue = ({ value }: { value: number }) => {
  return (
    <Paper withBorder radius={"sm"}>
      <Center p={"5px"}>{value}</Center>
    </Paper>
  );
};

/*============================MembersGrid============================*/

const MembersGrid = () => {
  return (
    <Box>
      <Paper bg="white" p="md" radius="lg" withBorder>
        <Title order={4} c="black" mb="md">
          Members
        </Title>

        <MembersTab />
      </Paper>
    </Box>
  );
};

/*============================FilterResults============================*/

const FilterResults = () => {
  const { pathname } = useLocation();
  const pathnameArr = pathname.split("/");
  const value = pathnameArr[pathnameArr.length - 1];
  return (
    <Box>
      <Paper bg="white" p="md" radius="lg" withBorder>
        <Title order={4} c="black" mb="md">
          Filter Results
        </Title>

        <Form method="post" action={`/members/${value}`}>
          <Stack gap={"md"} mb={"md"}>
            <TextInput
              label="First name"
              name="first_name"
              placeholder="John"
              withAsterisk
            />

            <TextInput
              label="Last name"
              name="last_name"
              placeholder="Smith"
              withAsterisk
            />
          </Stack>

          <Button
            leftSection={<IconZoomReset size={14} />}
            variant="transparent"
          >
            Reset
          </Button>

          <Button type="submit">Search</Button>
        </Form>
      </Paper>
    </Box>
  );
};

/*============================Members============================*/

export const Members = () => {
  return (
    <Box>
      <Paper bg="white" p="md" radius="lg" withBorder>
        <Title order={4} c="black" mb="md">
          Members
        </Title>

        <Box mb={"15px"} h={"200px"}>
          <Tabs defaultValue="newest">
            <Tabs.List>
              <Tabs.Tab value="newest">Newest</Tabs.Tab>
              <Tabs.Tab value="active">Active</Tabs.Tab>
              <Tabs.Tab value="popular">Popular</Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="newest">Newest tab content</Tabs.Panel>

            <Tabs.Panel value="active">Active tab content</Tabs.Panel>

            <Tabs.Panel value="popular">Popular tab content</Tabs.Panel>
          </Tabs>
        </Box>

        <Button>SEE ALL</Button>
      </Paper>
    </Box>
  );
};

/*============================MembersMain============================*/

const MembersMain = () => {
  return (
    <Container size={"xl"} pb={"lg"}>
      <Grid w={{ base: "100%", md: "90%" }} gutter={"lg"} m={"auto"}>
        <Grid.Col span={"auto"}>
          <MembersGrid />
        </Grid.Col>

        <Grid.Col span={"content"} w={{ base: "100%", md: "300px" }}>
          <Stack gap={"lg"}>
            <FilterResults />
            <Members />
          </Stack>
        </Grid.Col>
      </Grid>
    </Container>
  );
};

export default function MembersPage() {
  return (
    <main>
      <MembersMain />
    </main>
  );
}
