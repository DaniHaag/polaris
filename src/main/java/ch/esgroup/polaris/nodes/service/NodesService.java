package ch.esgroup.polaris.nodes.service;

import java.util.Collection;

import javax.ws.rs.core.Response;

import ch.esgroup.polaris.nodes.domain.Node;

public interface NodesService {

	Node get(String id);

	Collection<Node> getAll();

	Response post(Node employee);

	Response put(Node employee);

	Response delete(String id);

}