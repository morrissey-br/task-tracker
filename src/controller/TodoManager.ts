import {
  collection,
  getDocs,
  query,
  getFirestore,
  orderBy,
  startAt,
  limit,
  QueryDocumentSnapshot,
  DocumentData,
  SnapshotOptions,
  addDoc,
  setDoc,
  doc,
} from "firebase/firestore";
import { Todo } from "../model/Todo";

export default class TodoManager {
  private readonly COLLECTION_NAME = "todos";
  private readonly PAGE_SIZE = 10;
  private readonly DB = getFirestore();
  private readonly TODO_CONVERTER = {
    toFirestore: (todo: Todo) => {
      return {
        id: todo.id,
        title: todo.title,
        completed: todo.completed,
        order: todo.order,
        createdAt: todo.createdAt,
        updatedAt: todo.updatedAt,
      };
    },
    fromFirestore: (
      snapshot: QueryDocumentSnapshot<DocumentData>,
      options?: SnapshotOptions
    ) => {
      const data = snapshot.data(options);
      return {
        id: data.id,
        title: data.title,
        completed: data.completed,
        order: data.order,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
      };
    },
  };

  async getTodos(page: number): Promise<Todo[]> {
    const q = query(
      collection(this.DB, this.COLLECTION_NAME),
      orderBy("order", "asc"),
      startAt((page - 1) * this.PAGE_SIZE),
      limit(this.PAGE_SIZE)
    ).withConverter(this.TODO_CONVERTER);
    const querySnapshot = await getDocs(q);
    const todos: Todo[] = [];
    querySnapshot.forEach((doc) => {
      todos.push(doc.data());
    });
    return todos;
  }

  async createTodo(todo: Omit<Todo, "id">): Promise<string> {
    const docRef = await addDoc(
      collection(this.DB, this.COLLECTION_NAME),
      todo
    );
    return docRef.id;
  }

  async updateTodo(todo: Partial<Todo> & Pick<Todo, "id">): Promise<void> {
    await setDoc(doc(this.DB, this.COLLECTION_NAME, todo.id), todo, {
      merge: true,
    });
  }

  async deleteTodoById(id: string): Promise<void> {
    await setDoc(doc(this.DB, this.COLLECTION_NAME, id), {
      deletedAt: new Date(),
    });
  }
}
