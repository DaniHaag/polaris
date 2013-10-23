package ch.esgroup.polaris.navigation.domain;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlElementWrapper;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;
import java.util.Collection;

@XmlType(name = "NodesType", namespace = "ch.esgroup.polaris.navigation.nodes")
@XmlRootElement(name = "Nodes", namespace = "ch.esgroup.polaris.navigation.nodes")
public class Nodes {

	private Collection<Node> nodes;

	public Nodes() {
	}

	public Nodes(Collection<Node> nodes) {
		setNodes(nodes);
	}

	@XmlElement(name = "node", required = true)
	@XmlElementWrapper(name = "employees")
	public Collection<Node> getNodes() {
		return nodes;
	}

	public void setNodes(Collection<Node> nodes) {
		this.nodes = nodes;
	}
}