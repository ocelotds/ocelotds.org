package org.ocelotds.angular;

import org.ocelotds.Constants;
import org.ocelotds.annotations.DataService;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.PostConstruct;
import javax.enterprise.context.ApplicationScoped;
import org.ocelotds.annotations.JsTopic;

/**
 *
 * @author hhfrancois
 */
@ApplicationScoped
@DataService(resolver = Constants.Resolver.CDI)
public class TodoServices {

	private List<Todo> todos;
	
	@PostConstruct
	public void constructor() {
		init();
	} 

	@JsTopic("update-todos")
	public List<Todo> init() {
		todos = new ArrayList<>();
		todos.add(new Todo("learn angular", true));
		todos.add(new Todo("build an angular app", false));
		return todos;
	}

	public List<Todo> getTodos() {
		return todos;
	}

	@JsTopic("add-todo")
	public Todo addTodo(String text) {
		Todo todo = new Todo(text, false);
		todos.add(todo);
		return todo;
	}

	@JsTopic("update-todo")
	public Todo updateTodo(Todo todo) {
		for (Todo t : todos) {
			if (t.equals(todo)) {
				t.setDone(todo.isDone());
			}
		}
		return todo;
	}

	@JsTopic("update-todos")
	public List<Todo> archive() {
		List<Todo> saved = new ArrayList<>();
		saved.addAll(todos);
		todos.clear();
		for (Todo t : saved) {
			if (!t.isDone()) {
				todos.add(t);
			}
		}
		return todos;
	}
}
