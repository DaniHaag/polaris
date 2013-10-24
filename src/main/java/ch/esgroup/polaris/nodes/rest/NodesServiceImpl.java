package ch.esgroup.polaris.nodes.rest;

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

import ch.esgroup.polaris.nodes.domain.Link;
import ch.esgroup.polaris.nodes.domain.Node;
import ch.esgroup.polaris.nodes.service.NodesService;

@Path("/nodes/")
@Produces("application/json")
public class NodesServiceImpl implements NodesService {

	private static final Map<String, Node> NODE_MAP = new HashMap<String, Node>();

	static {
		NODE_MAP.put("home", new Node("main.home", "page", "Home", false, false, false, "home", "default"));
		NODE_MAP.get("home").addLink(new Link("default", "/welcome", null));
		NODE_MAP.put("menu", new Node("main.home.menu", "label", "Menu", false, false, false, null, "default"));
		NODE_MAP.put("page", new Node("main.menu.page", "page", "Page", false, false, false, "page", "default"));
		NODE_MAP.get("page").addLink(new Link("default", "/welcome", null));
		NODE_MAP.put("divider", new Node("main.menu.divider", "divider", null, false, false, false, null, "default"));
		NODE_MAP.put("header", new Node("main.menu.header", "header", null, false, false, false, null, "default"));
		NODE_MAP.put("external", new Node("main.menu.external", "external", "External", false, false, false, "external", "default"));
		NODE_MAP.get("external").addLink(new Link("default", "/welcome", null));
		NODE_MAP.put("modal", new Node("main.menu.modal", "modal", "Modal", false, false, false, "modal", "default"));
		NODE_MAP.get("modal").addLink(new Link("default", "/welcome",null ));
		NODE_MAP.put("disabled", new Node("main.menu.disabled", "page", "Disabled", false, true, false, "disabled", "default"));
		NODE_MAP.get("disabled").addLink(new Link("default", "/welcome", null));
		NODE_MAP.put("hidden", new Node("main.menu.hidden", "Hidden", "Disabled", false, false, false, "hidden", "default"));
		NODE_MAP.get("hidden").addLink(new Link("default", "/welcome", null));
		NODE_MAP.put("index", new Node("main.index", "index", "Index", true, false, false, "index", "default"));
		NODE_MAP.get("index").addLink(new Link("default", "/welcome", null));
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