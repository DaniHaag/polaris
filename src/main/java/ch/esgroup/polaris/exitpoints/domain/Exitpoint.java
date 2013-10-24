package ch.esgroup.polaris.exitpoints.domain;

import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;
import java.io.Serializable;

@XmlRootElement(name = "node")
public class Exitpoint implements Serializable {

	private String id;

	private String type;

	private String label;

	private boolean hidden;

	private boolean disabled;

	private boolean active;

	private String bookmark;

	public Exitpoint() {
	}

	public Exitpoint(String id, String type, String label, boolean hidden, boolean disabled, boolean active, String bookmark) {
		this.id = id;
		this.type = type;
		this.label = label;
		this.hidden = hidden;
		this.disabled = disabled;
		this.active = active;
		this.bookmark = bookmark;
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

	@Override
	public String toString() {
		return "Node{" + "id=" + id + ", type='" + type + '\'' + ", label='" + label + '\'' + ", hidden='" + hidden + '\'' + ", disabled='" + disabled + '\'' + ", active='" + active + '\'' + ", bookmark='" + bookmark + '\'' + '}';
	}

}
