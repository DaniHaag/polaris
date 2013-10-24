package ch.esgroup.polaris.nodes.domain;

import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Collection;

@XmlRootElement(name = "node")
public class Node implements Serializable {

	private String id;

	private String type;

	private String label;

	private boolean hidden;

	private boolean disabled;

	private boolean active;

	private String bookmark;

	private String layout;

	private Collection<Link> links;

	public Node() {
	}

	public Node(String id, String type, String label, boolean hidden, boolean disabled, boolean active, String bookmark, String layout) {
		this.id = id;
		this.type = type;
		this.label = label;
		this.hidden = hidden;
		this.disabled = disabled;
		this.active = active;
		this.bookmark = bookmark;
		this.layout = layout;
		this.links = new ArrayList<Link>();
	}

	public Node(String id, String type, String label, boolean hidden, boolean disabled, boolean active, String bookmark, String layout, Collection<Link> links) {
		this.id = id;
		this.type = type;
		this.label = label;
		this.hidden = hidden;
		this.disabled = disabled;
		this.active = active;
		this.bookmark = bookmark;
		this.layout = layout;
		this.links = links;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getLabel() {
		return label;
	}

	public void setLabel(String label) {
		this.label = label;
	}

	public boolean isHidden() {
		return hidden;
	}

	public void setHidden(boolean hidden) {
		this.hidden = hidden;
	}

	public boolean isDisabled() {
		return disabled;
	}

	public void setDisabled(boolean disabled) {
		this.disabled = disabled;
	}

	public boolean isActive() {
		return active;
	}

	public void setActive(boolean active) {
		this.active = active;
	}

	public String getBookmark() {
		return bookmark;
	}

	public void setBookmark(String bookmark) {
		this.bookmark = bookmark;
	}

	public Collection<Link> getLinks() {
		return links;
	}

	public void addLink(Link link) {
		this.links.add(link);
	}

}
