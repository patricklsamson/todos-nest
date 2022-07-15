import { RepositoryModule } from "./repository.module";
import { TagModule } from "./tag.module";
import { TodoModule } from "./todo.module";

const indexModule: any[] = [RepositoryModule, TagModule, TodoModule];

export default indexModule;
