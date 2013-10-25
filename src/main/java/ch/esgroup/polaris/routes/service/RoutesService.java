package ch.esgroup.polaris.routes.service;

import java.util.Collection;

import javax.ws.rs.core.Response;

import ch.esgroup.polaris.routes.domain.Route;

public interface RoutesService {

	Route get(String id);

	Collection<Route> getAll();

	Response post(Route route);

	Response put(Route route);

	Response delete(String id);

}