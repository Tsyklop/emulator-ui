import {Container, Group, Paper, Text} from '@mantine/core';

export function MainPage() {
  return (
    <Container fluid p={0}>
      <Paper shadow="xs" p="md">
        <Group position="apart">
          <Text fz="xl">Main</Text>
        </Group>
      </Paper>
    </Container>
  );
}