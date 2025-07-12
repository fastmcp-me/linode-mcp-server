import { FastMCP } from 'fastmcp';
import { createClient, LinodeClient } from '../../client';
import * as schemas from './schemas';
import { withErrorHandling } from '../common/errorHandler';

export function registerNetworkingTools(server: FastMCP, client: LinodeClient) {
  // IP Address operations
    server.addTool({
    name: 'list_ip_addresses',
    description: 'list all IP addresses',
    parameters: schemas.getIPAddressesSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context, server).networking.getIPAddresses();
      return JSON.stringify(result, null, 2);
    })
  });

    server.addTool({
    name: 'get_ip_address',
    description: 'Get details for a specific IP address',
    parameters: schemas.getIPAddressSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context, server).networking.getIPAddress(params.address);
      return JSON.stringify(result, null, 2);
    })
  });

  server.addTool({
    name: 'update_ip_address',
    description: 'Update reverse DNS for an IP address',
    parameters: schemas.updateIPSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context, server).networking.updateIPAddress(params.address, { rdns: params.rdns });
      return JSON.stringify(result, null, 2);
    })
  });

    server.addTool({
    name: 'allocate_ip',
    description: 'Allocate a new IP address',
    parameters: schemas.allocateIPSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context, server).networking.allocateIPAddress(params);
      return JSON.stringify(result, null, 2);
    })
  });

    server.addTool({
    name: 'share_ips',
    description: 'Share IP addresses between Linodes',
    parameters: schemas.shareIPsSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context, server).networking.shareIPAddresses(params);
      return JSON.stringify(result, null, 2);
    })
  });

  // IPv6 operations
    server.addTool({
    name: 'list_ipv6_ranges',
    description: 'List all IPv6 ranges',
    parameters: schemas.getIPv6RangesSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context, server).networking.getIPv6Ranges();
      return JSON.stringify(result, null, 2);
    })
  });

    server.addTool({
    name: 'get_ipv6_range',
    description: 'Get a specific IPv6 range',
    parameters: schemas.getIPv6RangeSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context, server).networking.getIPv6Range(params.range);
      return JSON.stringify(result, null, 2);
    })
  });

    server.addTool({
    name: 'list_ipv6_pools',
    description: 'List all IPv6 pools',
    parameters: schemas.getIPv6PoolsSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context, server).networking.getIPv6Pools();
      return JSON.stringify(result, null, 2);
    })
  });

  // Firewall operations
    server.addTool({
    name: 'list_firewalls',
    description: 'List all firewalls',
    parameters: schemas.getFirewallsSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      const paginationParams = {
        page: params.page,
        page_size: params.page_size
      };
      const result = await createClient(context, server).networking.getFirewalls(paginationParams);
      return JSON.stringify(result, null, 2);
    })
  });

    server.addTool({
    name: 'get_firewall',
    description: 'Get details for a specific firewall',
    parameters: schemas.getFirewallSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context, server).networking.getFirewall(params.id);
      return JSON.stringify(result, null, 2);
    })
  });

    server.addTool({
    name: 'create_firewall',
    description: 'Create a new firewall',
    parameters: schemas.createFirewallSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      // Create FirewallRequest with correct structure
      const firewall: any = {
        label: params.label,
        rules: {
          inbound_policy: params.rules?.inbound_policy || 'DROP',
          outbound_policy: params.rules?.outbound_policy || 'ACCEPT',
          inbound: params.rules?.inbound || [],
          outbound: params.rules?.outbound || []
        }
      };
      
      // Add optional fields if provided
      if (params.tags) {
        firewall.tags = params.tags;
      }
      
      if (params.devices) {
        firewall.devices = params.devices;
      }
      
      const result = await createClient(context, server).networking.createFirewall(firewall);
      return JSON.stringify(result, null, 2);
    })
  });

    server.addTool({
    name: 'update_firewall',
    description: 'Update a firewall',
    parameters: schemas.updateFirewallSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      const { id, ...updateData } = params;
      const result = await createClient(context, server).networking.updateFirewall(id, updateData);
      return JSON.stringify(result, null, 2);
    })
  });

    server.addTool({
    name: 'delete_firewall',
    description: 'Delete a firewall',
    parameters: schemas.deleteFirewallSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context, server).networking.deleteFirewall(params.id);
      return JSON.stringify(result, null, 2);
    })
  });

  // Firewall rules operations
    server.addTool({
    name: 'list_firewall_rules',
    description: 'List all rules for a specific firewall',
    parameters: schemas.getFirewallRulesSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context, server).networking.getFirewallRules(params.firewallId);
      return JSON.stringify(result, null, 2);
    })
  });

    server.addTool({
    name: 'update_firewall_rules',
    description: 'Update rules for a specific firewall',
    parameters: schemas.updateFirewallRulesSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      const { firewallId, ...ruleData } = params;
      const result = await createClient(context, server).networking.updateFirewallRules(firewallId, ruleData);
      return JSON.stringify(result, null, 2);
    })
  });

  // Firewall device operations
    server.addTool({
    name: 'list_firewall_devices',
    description: 'List all devices for a specific firewall',
    parameters: schemas.getFirewallDevicesSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      const { firewallId, page, page_size } = params;
      // The client doesn't accept pagination for this endpoint based on the interface
      const result = await createClient(context, server).networking.getFirewallDevices(firewallId);
      return JSON.stringify(result, null, 2);
    })
  });

    server.addTool({
    name: 'create_firewall_device',
    description: 'Create a new device for a specific firewall',
    parameters: schemas.createFirewallDeviceSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      const { firewallId, ...deviceData } = params;
      const result = await createClient(context, server).networking.createFirewallDevice(firewallId, deviceData);
      return JSON.stringify(result, null, 2);
    })
  });

    server.addTool({
    name: 'delete_firewall_device',
    description: 'Delete a device from a specific firewall',
    parameters: schemas.deleteFirewallDeviceSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context, server).networking.deleteFirewallDevice(params.firewallId, params.deviceId);
      return JSON.stringify(result, null, 2);
    })
  });

  // VLAN operations
    server.addTool({
    name: 'list_vlans',
    description: 'List all VLANs',
    parameters: schemas.getVLANsSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      const paginationParams = {
        page: params.page,
        page_size: params.page_size
      };
      const result = await createClient(context, server).networking.getVLANs(paginationParams);
      return JSON.stringify(result, null, 2);
    })
  });

    server.addTool({
    name: 'get_vlan',
    description: 'Get a specific VLAN',
    parameters: schemas.getVLANSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context, server).networking.getVLAN(params.regionId, params.label);
      return JSON.stringify(result, null, 2);
    })
  });
}