package ch.esgroup.polaris.navigation.service;

import java.util.Collection;

import javax.ws.rs.core.Response;

import ch.esgroup.polaris.navigation.domain.Node;

public interface NavigationService {

	Node get(Long id);

	Collection<Node> getAll();

	Response post(Node employee);

	Response put(Node employee);

	Response delete(Long id);

}