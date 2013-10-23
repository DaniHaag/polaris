package ch.esgroup.polaris.navigation.service;

import javax.ws.rs.core.Response;

import ch.esgroup.polaris.navigation.domain.Node;
import ch.esgroup.polaris.navigation.domain.Nodes;

public interface NavigationService {

	Node get(Long id);

	Nodes getAll();

	Response post(Node employee);

	Response put(Node employee);

	Response delete(Long id);

}