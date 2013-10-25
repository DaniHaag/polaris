package ch.esgroup.polaris.routes.domain;

import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Collection;

@XmlRootElement(name = "route")
public class Route implements Serializable {

	private String id;

	private String pattern;

	private String handler;

	public Route() {
	}

	public Route(String id, String pattern, String handler) {
		this.id = id;
		this.pattern = pattern;
		this.handler = handler;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getPattern() {
		return pattern;
	}

	public void setPattern(String pattern) {
		this.pattern = pattern;
	}

	public String getHandler() {
		return handler;
	}

	public void setHandler(String handler) {
		this.handler = handler;
	}

}
