export class TodoModel {
    id: String | null;
    title: String | null;
    completed: Boolean | null;
  
    constructor(id: string, title: string, completed: boolean) {
      this.id = id;
      this.title = title;
      this.completed = completed;
    }
  }