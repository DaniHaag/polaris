package ch.esgroup.polaris.settings.domain;

import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;
import java.io.Serializable;

@XmlRootElement(name = "setting")
public class Setting implements Serializable {

	private String id;

	private String value;

	public Setting() {
	}

	public Setting(String id, String value) {
		this.id = id;
		this.value = value;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}

	@Override
	public String toString() {
		return "{" + "id=" + id + ", value='" + value + '\'' + '}';
	}

}
