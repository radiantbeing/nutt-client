import { Container, Grid, GridItem } from "@chakra-ui/react";

type TemplateGridProps = {
  header: React.ReactNode;
  main: React.ReactNode;
  footer: React.ReactNode;
};

export default function TemplateGrid(props: TemplateGridProps) {
  return (
    <Container height="full">
      <Grid height="full" templateRows="1fr 9.6fr 1.4fr">
        {/* Header */}
        <GridItem height="full">{props.header}</GridItem>
        {/* Main */}
        <GridItem
          height="full"
          paddingTop={4}
          paddingBottom={4}
          paddingLeft={1}
          paddingRight={1}
          overflowY="auto"
        >
          {props.main}
        </GridItem>
        {/* Footer */}
        <GridItem height="full">{props.footer}</GridItem>
      </Grid>
    </Container>
  );
}
