package ch.esgroup.polaris.navigation.rest;

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

import ch.esgroup.polaris.navigation.domain.Node;
import ch.esgroup.polaris.navigation.service.NavigationService;

@Path("/nodes/")
@Produces("application/json")
public class NavigationRestService implements NavigationService {

	private static final Map<String, Node> NODE_MAP = new HashMap<String, Node>();

	static {
		NODE_MAP.put("main.home", new Node("main.home", "page", "Home", false, false, false, "home"));
		NODE_MAP.put("main.menu", new Node("main.home.menu", "label", "Menu", false, false, false, null));
		NODE_MAP.put("main.menu.page", new Node("main.menu.page", "page", "Page", false, false, false, "page"));
		NODE_MAP.put("main.menu.divider", new Node("main.menu.divider", "divider", null, false, false, false, null));
		NODE_MAP.put("main.menu.header", new Node("main.menu.header", "header", null, false, false, false, null));
		NODE_MAP.put("main.menu.external", new Node("main.menu.external", "external", "External", false, false, false, "external"));
		NODE_MAP.put("main.menu.modal", new Node("main.menu.modal", "modal", "Modal", false, false, false, "modal"));
		NODE_MAP.put("main.menu.disabled", new Node("main.menu.disabled", "page", "Disabled", false, true, false, "disabled"));
		NODE_MAP.put("main.menu.hidden", new Node("main.menu.hidden", "Hidden", "Disabled", false, false, false, "hidden"));
		NODE_MAP.put("main.index", new Node("main.index", "index", "Index", true, false, false, "index"));
	}

	@GET
	@Path("{id}")
	public Node get(@PathParam("id") Long id) {
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
	public Response delete(@PathParam("id") Long id) {
		Node e = NODE_MAP.remove(id);
		System.out.println("Deleted :" + e);
		return Response.status(Response.Status.OK).build();
	}

}