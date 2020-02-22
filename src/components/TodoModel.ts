export class TodoModel {
    id: String | undefined;
    title: String | undefined;
    completed: Boolean | undefined;
  
    constructor(id: string, title: string, completed: boolean) {
      this.id = id;
      this.title = title;
      this.completed = completed;
    }
  }