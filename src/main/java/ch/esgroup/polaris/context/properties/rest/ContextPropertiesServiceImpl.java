package ch.esgroup.polaris.context.properties.rest;

import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;

import ch.esgroup.polaris.nodes.domain.Node;
import ch.esgroup.polaris.nodes.service.NodesService;

@Path("/nodes/")
@Produces("application/json")
public class ContextPropertiesServiceImpl implements NodesService {

	private static final Map<String, Node> NODE_MAP = new HashMap<String, Node>();

	static {

	}

	@GET
	@Path("{id}")
	public Node get(@PathParam("id") String id) {
		return NODE_MAP.get(id);
	}

	@GET
	public Collection<Node> getAll() {
		return NODE_MAP.values();
	}

	@POST
	@Consumes("application/json")
	public Response post(Node node) {
		System.out.println("Adding :" + node);
		node.setId(node.getId());
		put(node);
		return Response.status(Response.Status.OK).build();
	}

	@PUT
	@Consumes("application/json")
	public Response put(Node node) {
		System.out.println("Updating :" + node);
		NODE_MAP.put(node.getId(), node);
		return Response.status(Response.Status.OK).build();
	}

	@DELETE
	public Response delete(@PathParam("id") String id) {
		Node e = NODE_MAP.remove(id);
		System.out.println("Deleted :" + e);
		return Response.status(Response.Status.OK).build();
	}

}