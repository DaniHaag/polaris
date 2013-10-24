package ch.esgroup.polaris.settings.rest;

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

import ch.esgroup.polaris.settings.domain.Setting;
import ch.esgroup.polaris.settings.service.SettingsService;

@Path("/settings/")
@Produces("application/json")
public class SettingsServiceImpl implements SettingsService {

	private static final Map<String, Setting> SETTING_MAP = new HashMap<String, Setting>();

	static {
		SETTING_MAP.put("main.home", new Setting("", ""));
		SETTING_MAP.put("main.home", new Setting("", ""));
	}

	@GET
	@Path("{id}")
	public Setting get(@PathParam("id") String id) {
		return SETTING_MAP.get(id);
	}

	@GET
	public Collection<Setting> getAll() {
		return SETTING_MAP.values();
	}

	@POST
	@Consumes("application/json")
	public Response post(Setting setting) {
		System.out.println("Adding :" + setting);
		setting.setId(setting.getId());
		put(setting);
		return Response.status(Response.Status.OK).build();
	}

	@PUT
	@Consumes("application/json")
	public Response put(Setting setting) {
		System.out.println("Updating :" + setting);
		SETTING_MAP.put(setting.getId(), setting);
		return Response.status(Response.Status.OK).build();
	}

	@DELETE
	public Response delete(@PathParam("id") String id) {
		Setting e = SETTING_MAP.remove(id);
		System.out.println("Deleted :" + e);
		return Response.status(Response.Status.OK).build();
	}

}