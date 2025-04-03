import {
  Box,
  Container,
  SimpleGrid,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useEffect } from "react";
import ProjectCard from "../components/ProjectCard";
import { useProjectStore } from "../store/project";

const HomePage = () => {
  const { projects, loading, fetchProjects } = useProjectStore();

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return (
    <Container maxW={"container.xl"} py={12}>
      <VStack spacing={8}>
        <Text
          fontSize={"30"}
          fontWeight={"bold"}
          bgGradient={"linear(to-r,cyan.400, blue.500)"}
          bgClip={"text"}
          textAlign={"center"}
        >
          My Projects
        </Text>
        <SimpleGrid
          columns={{
            base: 1,
            md: 2,
            lg: 3,
          }}
          spacing={10}
          w={"full"}
        >
          {[...projects]
            .sort((a, b) => b.index - a.index)
            .map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
        </SimpleGrid>
        {loading && (
          <Box display="flex" justifyContent="center" alignItems="center">
            <Spinner size="xl" />
          </Box>
        )}
        {projects.length === 0 && (
          <Text
            fontSize={"xl"}
            fontWeight={"bold"}
            textAlign={"center"}
            color={"gray.500"}
          >
            No project found.
          </Text>
        )}
      </VStack>
    </Container>
  );
};

export default HomePage;
