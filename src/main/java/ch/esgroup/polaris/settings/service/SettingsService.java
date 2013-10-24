package ch.esgroup.polaris.settings.service;

import java.util.Collection;

import javax.ws.rs.core.Response;

import ch.esgroup.polaris.settings.domain.Setting;

public interface SettingsService {

	Setting get(String id);

	Collection<Setting> getAll();

	Response post(Setting setting);

	Response put(Setting setting);

	Response delete(String id);

}