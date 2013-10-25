package ch.esgroup.polaris.routes.rest;

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

import ch.esgroup.polaris.routes.domain.Route;
import ch.esgroup.polaris.routes.service.RoutesService;

@Path("/routes/")
@Produces("application/json")
public class RoutesServiceImpl implements RoutesService {

	private static final Map<String, Route> ROUTE_MAP = new HashMap<String, Route>();

	static {
		ROUTE_MAP.put("home", new Route("home", "node/home", "page"));
		ROUTE_MAP.put("page", new Route("page", "node/page", "page"));
		ROUTE_MAP.put("external", new Route("external", "node/external", "external"));
		ROUTE_MAP.put("modal", new Route("modal", "node/modal", "external"));
		ROUTE_MAP.put("hidden", new Route("hidden", "node/hidden", "page"));
		ROUTE_MAP.put("index", new Route("index", "node/index", "index"));
	}

	@GET
	@Path("{id}")
	public Route get(@PathParam("id") String id) {
		return ROUTE_MAP.get(id);
	}

	@GET
	public Collection<Route> getAll() {
		return ROUTE_MAP.values();
	}

	@POST
	@Consumes("application/json")
	public Response post(Route route) {
		System.out.println("Adding :" + route);
		route.setId(route.getId());
		put(route);
		return Response.status(Response.Status.OK).build();
	}

	@PUT
	@Consumes("application/json")
	public Response put(Route route) {
		System.out.println("Updating :" + route);
		ROUTE_MAP.put(route.getId(), route);
		return Response.status(Response.Status.OK).build();
	}

	@DELETE
	public Response delete(@PathParam("id") String id) {
		Route route = ROUTE_MAP.remove(id);
		System.out.println("Deleted :" + route);
		return Response.status(Response.Status.OK).build();
	}

}