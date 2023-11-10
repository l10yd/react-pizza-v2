//просто общий файл экспорта components, чтобы сократитить импорт в каждом компоненте

/*import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock/index";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Pagination from "../Pagination/index";

export { Categories, Sort, PizzaBlock, Skeleton, Pagination };*/

//лучше делать так
export { default as Categories } from "../components/Categories";
export { default as Sort } from "../components/Sort";
export { default as PizzaBlock } from "../components/PizzaBlock/index";
export { default as Skeleton } from "../components/PizzaBlock/Skeleton";
export { default as Pagination } from "../Pagination/index";
