package ch.esgroup.polaris.nodes.domain;

import java.io.Serializable;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name = "link")
public class Link implements Serializable {

	private String id;

	private String href;

	private String name;

	public Link() {
	}

	public Link(String id, String href) {
		this.id = id;
		this.href = href;
	}

	public Link(String id, String href, String name) {
		this.id = id;
		this.href = href;
		this.name = name;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getHref() {
		return href;
	}

	public void setHref(String href) {
		this.href = href;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

}
