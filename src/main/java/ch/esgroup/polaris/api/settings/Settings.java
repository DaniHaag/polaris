package ch.esgroup.polaris.api.settings;

import java.util.Date;

import javax.ws.rs.GET;
import javax.ws.rs.Path;

@Path("/LATEST/list")
public class Settings {

	@GET
	public String list() {
		return "pojo ok @ " + new Date().toString();
	}

}
